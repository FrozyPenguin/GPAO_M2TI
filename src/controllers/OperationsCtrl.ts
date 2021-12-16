import { NextFunction, Request, Response } from 'express';
import {
  Operation
} from '../models/Operation';

export function getOperations(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(500).json({
    error: 'Not yet implemented !',
  });
}

export function getOperation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(500).json({
    error: 'Not yet implemented !',
  });
}

export function addOperation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(500).json({
    error: 'Not yet implemented !',
  });
}

export function deleteOperation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(500).json({
    error: 'Not yet implemented !',
  });
}

export function updateOperation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(500).json({
    error: 'Not yet implemented !',
  });
}
