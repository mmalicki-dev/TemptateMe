import type { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { RateLimiterMongo } from 'rate-limiter-flexible';
import { errorHelper } from '../../utils/index.js';

const rateLimiterMongo = new RateLimiterMongo({
  storeClient: mongoose.connection,
  tableName: 'rateLimits',
  points: 100,
  duration: 60,
});

export default function rateLimiter(req: Request, res: Response, next: NextFunction): void {
  rateLimiterMongo
    .consume(req.ip ?? 'unknown')
    .then(() => next())
    .catch((err: Error) => {
      res.status(429).json(errorHelper('00024', req, err.message));
    });
}
