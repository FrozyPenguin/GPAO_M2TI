import { Operation } from './../../models/Operation';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';

const OperationRepository = getRepository(Operation);

export async function deleteOperation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const operation = await OperationRepository.findOne(
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

    if (!operation) {
      return res.status(404).json({
        error: 404,
        param: `${req.params.reference}, ${req.params.operation}`,
        message: 'Operation not found !',
      });
    }

    const removedOperation = await OperationRepository.remove(
      operation as Operation
    );

    return res.status(200).json({
      message: `Operation supprimé (succès) : ${
        `${removedOperation.reference}, ${removedOperation.numeroOperation}` ||
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
