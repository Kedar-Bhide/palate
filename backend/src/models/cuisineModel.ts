import pool from '../config/database';
import { Cuisine, CuisineLog, CuisineLogWithDetails } from '../types';

export class CuisineModel {
  static async getAllCuisines(): Promise<Cuisine[]> {
    const result = await pool.query('SELECT * FROM cuisines ORDER BY name');
    return result.rows;
  }

  static async getCuisineById(id: number): Promise<Cuisine | null> {
    const result = await pool.query('SELECT * FROM cuisines WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async createCuisineLog(logData: {
    user_id: string;
    cuisine_ids: number[];
    photo_url: string;
    caption?: string;
  }): Promise<CuisineLog> {
    const { user_id, cuisine_ids, photo_url, caption } = logData;
    
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      // Create the log entry
      const logResult = await client.query(
        'INSERT INTO cuisine_logs (user_id, photo_url, caption) VALUES ($1, $2, $3) RETURNING *',
        [user_id, photo_url, caption]
      );
      
      const log = logResult.rows[0];
      
      // Insert cuisine relationships
      if (cuisine_ids && cuisine_ids.length > 0) {
        const cuisineValues = cuisine_ids.map((_, index) => 
          `($1, $${index + 2})`
        ).join(', ');
        
        await client.query(
          `INSERT INTO log_cuisines (log_id, cuisine_id) VALUES ${cuisineValues}`,
          [log.id, ...cuisine_ids]
        );
      }
      
      await client.query('COMMIT');
      return log;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async getUserCuisineLogs(userId: string): Promise<CuisineLogWithDetails[]> {
    const result = await pool.query(`
      SELECT 
        cl.*,
        COALESCE(
          ARRAY_AGG(
            JSON_BUILD_OBJECT(
              'id', c.id,
              'name', c.name,
              'category', c.category
            )
          ) FILTER (WHERE c.id IS NOT NULL),
          ARRAY[]::json[]
        ) as cuisines
      FROM cuisine_logs cl
      LEFT JOIN log_cuisines lc ON cl.id = lc.log_id
      LEFT JOIN cuisines c ON lc.cuisine_id = c.id
      WHERE cl.user_id = $1
      GROUP BY cl.id, cl.user_id, cl.photo_url, cl.caption, cl.created_at
      ORDER BY cl.created_at DESC
    `, [userId]);
    return result.rows;
  }

  static async getUserStats(userId: string): Promise<{ total_cuisines: number }> {
    const result = await pool.query(`
      SELECT COUNT(DISTINCT lc.cuisine_id) as total_cuisines 
      FROM cuisine_logs cl
      LEFT JOIN log_cuisines lc ON cl.id = lc.log_id
      WHERE cl.user_id = $1 AND lc.cuisine_id IS NOT NULL
    `, [userId]);
    return { total_cuisines: parseInt(result.rows[0].total_cuisines || '0') };
  }
}