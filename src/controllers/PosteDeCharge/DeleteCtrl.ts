import { PosteDeCharge } from './../../models/PosteDeCharge';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';

const PosteDeChargeRepository = getRepository(PosteDeCharge);

export function deletePosteDeCharge(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(500).json({
    error: 'Not yet implemented !',
  });
}
