import { Article } from './../../models/Article';
import { validate, ValidationError } from 'class-validator';
import { Operation } from './../../models/Operation';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';

const OperationRepository = getRepository(Operation);

export async function addOperation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;
    const ArticleRepository = getRepository(Article);

    const reference = await ArticleRepository.findOne(body.reference);

    if (!reference) {
      return res.status(404).json({
        error: 404,
        message: `Article de reference non trouvé (échec) : ${body.reference}`,
      });
    }

    const operation: Operation = OperationRepository.create(body as Operation);

    const errors: ValidationError[] = await validate(operation, {
      skipMissingProperties: true,
    });
    if (errors.length > 0) {
      return res.status(400).json({
        error: 400,
        message: `Operation invalidé (échec) : ${errors
          .map((error) => error.toString())
          .join(', ')}`,
      });
    }

    const savedOperation: Operation = await OperationRepository.save(operation);
    return res.status(201).json({
      message: `Operation validé (succès) : ${savedOperation.reference}, ${savedOperation.numeroOperation}`,
    });
  } catch (error) {
    return res.status(500).json({
      error: 500,
      message: `Erreur au niveau de votre demande !`,
    });
  }
}
