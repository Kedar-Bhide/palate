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
    cuisine_id: number;
    photo_url: string;
    caption?: string;
  }): Promise<CuisineLog> {
    const { user_id, cuisine_id, photo_url, caption } = logData;
    const result = await pool.query(
      'INSERT INTO cuisine_logs (user_id, cuisine_id, photo_url, caption) VALUES ($1, $2, $3, $4) RETURNING *',
      [user_id, cuisine_id, photo_url, caption]
    );
    return result.rows[0];
  }

  static async getUserCuisineLogs(userId: string): Promise<CuisineLogWithDetails[]> {
    const result = await pool.query(`
      SELECT 
        cl.*,
        c.name as cuisine_name,
        c.category as cuisine_category
      FROM cuisine_logs cl
      JOIN cuisines c ON cl.cuisine_id = c.id
      WHERE cl.user_id = $1
      ORDER BY cl.created_at DESC
    `, [userId]);
    return result.rows;
  }

  static async getUserStats(userId: string): Promise<{ total_cuisines: number }> {
    const result = await pool.query(
      'SELECT COUNT(DISTINCT cuisine_id) as total_cuisines FROM cuisine_logs WHERE user_id = $1',
      [userId]
    );
    return { total_cuisines: parseInt(result.rows[0].total_cuisines) };
  }
}