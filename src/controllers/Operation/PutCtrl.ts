import { Operation } from './../../models/Operation';
import { Article } from './../../models/Article';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate, ValidationError } from 'class-validator';

const OperationRepository = getRepository(Operation);

export async function updateOperation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const operationToUpdate = await OperationRepository.findOne(
      {
        numeroOperation: Number(req.params.operation),
        reference: {
          reference: req.params.reference,
        },
      },
      {
        relations: ['reference', 'machine', 'mainDOeuvre'],
      }
    );

    if (!operationToUpdate) {
      return res.status(404).json({
        error: 404,
        param: `${req.params.reference}, ${req.params.operation}`,
        message: 'Operation not found !',
      });
    }

    const body = req.body;
    const ArticleRepository = getRepository(Article);

    const reference = await ArticleRepository.findOne(body.reference, {
      relations: ['composes', 'composants', 'operations', 'mouvementDeStocks'],
    });

    if (!reference) {
      return res.status(404).json({
        error: 404,
        message: `Article de reference non trouvé (échec) : ${body.reference}`,
      });
    }

    const operation: Operation = OperationRepository.create({
      ...operationToUpdate,
      ...body,
    } as Operation);

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

    const result = await OperationRepository.update(
      {
        numeroOperation: Number(req.params.operation),
        reference: {
          reference: req.params.reference,
        },
      },
      operation
    );

    if (!result.affected || result.affected < 1) throw new Error('Not saved');

    return res.status(201).json({
      message: `Operation mis à jour (succès) : ${
        `${operation.reference}, ${operation.numeroOperation}` ||
        `${req.params.reference}, ${req.params.operation}`
      }`,
    });
  } catch (error) {
    return res.status(500).json({
      error: 500,
      message: 'Erreur au niveau de votre demande !',
    });
  }
}
