import { NextFunction, Request, Response } from 'express';
import {
  MouvementDeStock
} from '../models/MouvementDeStock';

export function getMouvementsDeStocks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(500).json({
    error: 'Not yet implemented !',
  });
}

export function getMouvementsDeStock(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(500).json({
    error: 'Not yet implemented !',
  });
}

export function addMouvementsDeStock(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(500).json({
    error: 'Not yet implemented !',
  });
}

export function deleteMouvementsDeStock(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(500).json({
    error: 'Not yet implemented !',
  });
}

export function updateMouvementsDeStock(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(500).json({
    error: 'Not yet implemented !',
  });
}
