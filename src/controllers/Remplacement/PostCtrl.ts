import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Remplacement } from './../../models/Remplacement';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';

const RemplacementRepository = getRepository(Remplacement);

export function addRemplacement(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(500).json({
    error: 'Not yet implemented !',
  });
}
