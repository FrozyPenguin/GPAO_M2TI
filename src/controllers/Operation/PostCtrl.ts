import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Operation } from './../../models/Operation';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';

const OperationRepository = getRepository(Operation);

export function addOperation(req: Request, res: Response, next: NextFunction) {
  res.status(500).json({
    error: 'Not yet implemented !',
  });
}
