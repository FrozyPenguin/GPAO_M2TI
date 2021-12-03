import { NextFunction, Request, Response } from 'express';
import {
  PosteDeCharge,
  posteDeCharge,
} from '../models/PosteDeCharges';

export function getPosteDeCharges(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(500).json({
    error: 'Not yet implemented !',
  });
}

export function getPosteDeCharge(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(500).json({
    error: 'Not yet implemented !',
  });
}

export function addPosteDeCharge(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(500).json({
    error: 'Not yet implemented !',
  });
}

export function deletePosteDeCharge(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(500).json({
    error: 'Not yet implemented !',
  });
}

export function updatePosteDeCharge(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(500).json({
    error: 'Not yet implemented !',
  });
}
