import type { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { RateLimiterMongo } from 'rate-limiter-flexible';
import { fail } from '../../utils/index.js';

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
    .catch(() => {
      fail(res, "Too many requests, please try again later.", 429);
    });
}
