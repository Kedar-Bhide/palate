import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import { CuisineModel } from '../models/cuisineModel';
import { storage } from '../config/firebase';
import { v4 as uuidv4 } from 'uuid';

export class CuisineController {
  static async getAllCuisines(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const cuisines = await CuisineModel.getAllCuisines();
      console.log('Retrieved cuisines:', cuisines.length);
      res.json(cuisines);
    } catch (error) {
      console.error('Get cuisines error:', error);
      res.status(500).json({ error: 'Failed to fetch cuisines', details: error instanceof Error ? error.message : 'Unknown error' });
    }
  }

  static async logCuisine(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'Authentication required' });
        return;
      }

      const { cuisine_ids: cuisineIdsRaw, caption } = req.body;
      const file = req.file;

      if (!file) {
        res.status(400).json({ error: 'Photo is required' });
        return;
      }

      let cuisine_ids: number[];
      try {
        cuisine_ids = JSON.parse(cuisineIdsRaw);
        if (!Array.isArray(cuisine_ids) || cuisine_ids.length === 0) {
          res.status(400).json({ error: 'At least one cuisine must be selected' });
          return;
        }
      } catch (error) {
        res.status(400).json({ error: 'Invalid cuisine selection format' });
        return;
      }

      if (!storage) {
        // For development without Firebase Storage, use a placeholder URL
        console.warn('Firebase Storage not available - using placeholder image');
        const photo_url = `https://via.placeholder.com/400x300?text=Food+Photo`;

        const cuisineLog = await CuisineModel.createCuisineLog({
          user_id: req.user!.uid,
          cuisine_ids: cuisine_ids.map((id: number) => parseInt(id.toString())),
          photo_url,
          caption,
        });

        res.status(201).json({
          message: 'Cuisine logged successfully (development mode)',
          log: cuisineLog,
        });
        return;
      }

      const filename = `${uuidv4()}_${file.originalname}`;
      const bucket = storage.bucket();
      const fileUpload = bucket.file(`cuisine-photos/${filename}`);

      const stream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });

      stream.on('error', (error) => {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Failed to upload image' });
      });

      stream.on('finish', async () => {
        try {
          await fileUpload.makePublic();
          const photo_url = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;

          const cuisineLog = await CuisineModel.createCuisineLog({
            user_id: req.user!.uid,
            cuisine_ids: cuisine_ids.map((id: number) => parseInt(id.toString())),
            photo_url,
            caption,
          });

          res.status(201).json({
            message: 'Cuisine logged successfully',
            log: cuisineLog,
          });
        } catch (error) {
          console.error('Database error:', error);
          res.status(500).json({ error: 'Failed to save cuisine log' });
        }
      });

      stream.end(file.buffer);
    } catch (error) {
      console.error('Log cuisine error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getUserLogs(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'Authentication required' });
        return;
      }

      console.log('Fetching logs for user:', req.user.uid);
      const logs = await CuisineModel.getUserCuisineLogs(req.user.uid);
      const stats = await CuisineModel.getUserStats(req.user.uid);

      console.log('Retrieved logs:', logs.length, 'stats:', stats);

      res.json({
        logs: logs || [],
        stats: stats || { total_cuisines: 0 },
      });
    } catch (error) {
      console.error('Get user logs error:', error);
      res.status(500).json({ error: 'Failed to fetch user data', details: error instanceof Error ? error.message : 'Unknown error' });
    }
  }
}