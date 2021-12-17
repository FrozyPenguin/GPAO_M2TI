import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { MouvementDeStock } from './../../models/MouvementDeStock';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';

const MouvementDeStockRepository = getRepository(MouvementDeStock);

export function addMouvementsDeStock(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(500).json({
    error: 'Not yet implemented !',
  });
}
