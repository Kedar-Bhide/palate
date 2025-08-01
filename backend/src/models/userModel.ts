import pool from '../config/database';
import { User } from '../types';

export class UserModel {
  static async findOrCreateUser(userData: {
    id: string;
    email: string;
    name: string;
    profile_pic: string;
  }): Promise<User> {
    const { id, email, name, profile_pic } = userData;
    
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );

    if (existingUser.rows.length > 0) {
      await pool.query(
        'UPDATE users SET name = $2, profile_pic = $3 WHERE id = $1',
        [id, name, profile_pic]
      );
      return existingUser.rows[0];
    }

    const newUser = await pool.query(
      'INSERT INTO users (id, email, name, profile_pic) VALUES ($1, $2, $3, $4) RETURNING *',
      [id, email, name, profile_pic]
    );

    return newUser.rows[0];
  }

  static async getUserById(id: string): Promise<User | null> {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0] || null;
  }
}