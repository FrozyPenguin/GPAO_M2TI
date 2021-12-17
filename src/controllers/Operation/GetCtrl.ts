import { Operation } from './../../models/Operation';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';

const OperationRepository = getRepository(Operation);

export function getOperations(req: Request, res: Response, next: NextFunction) {
  res.status(500).json({
    error: 'Not yet implemented !',
  });
}

export function getOperation(req: Request, res: Response, next: NextFunction) {
  res.status(500).json({
    error: 'Not yet implemented !',
  });
}
