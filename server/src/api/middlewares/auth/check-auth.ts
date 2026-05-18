import type { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { verify } from 'jsonwebtoken';
import { User, Token } from '../../../models/index.js';
import { errorHelper } from '../../../utils/index.js';
import { jwtSecretKey } from '../../../config/index.js';

export default async function checkAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
  let token = req.header('Authorization');
  if (!token) {
    res.status(401).json(errorHelper('00006', req));
    return;
  }

  if (token.includes('Bearer')) token = token.replace('Bearer ', '');

  try {
    req.user = verify(token, jwtSecretKey) as { _id: string };
  } catch (err) {
    res.status(401).json(errorHelper('00012', req, (err as Error).message));
    return;
  }

  if (!Types.ObjectId.isValid(req.user._id)) {
    res.status(400).json(errorHelper('00007', req));
    return;
  }

  try {
    const exists = await User.exists({ _id: req.user._id, isVerified: true });
    if (!exists) {
      res.status(400).json(errorHelper('00009', req));
      return;
    }
  } catch (err) {
    res.status(500).json(errorHelper('00008', req, (err as Error).message));
    return;
  }

  try {
    const tokenExists = await Token.exists({ userId: req.user._id, status: true });
    if (!tokenExists) {
      res.status(401).json(errorHelper('00011', req));
      return;
    }
  } catch (err) {
    res.status(500).json(errorHelper('00010', req, (err as Error).message));
    return;
  }

  next();
}
