import { Operation } from './../../models/Operation';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';

const OperationRepository = getRepository(Operation);

export function getOperations(req: Request, res: Response, next: NextFunction) {
  OperationRepository.find({
    relations: ['reference', 'machine', 'mainDOeuvre'],
  })
    .then((operations) => res.status(200).json(operations))
    .catch((error) => {
      return res.status(500).json({
        error: 500,
        message: 'Erreur au niveau de votre demande !',
      });
    });
}

export function getOperationByRef(
  req: Request,
  res: Response,
  next: NextFunction
) {
  OperationRepository.find({
    where: {
      reference: req.params.reference,
    },
    relations: ['reference', 'machine', 'mainDOeuvre'],
  })
    .then((operations) => res.status(200).json(operations))
    .catch((error) => {
      return res.status(500).json({
        error: 500,
        message: 'Erreur au niveau de votre demande !',
      });
    });
}

export function getOperationByOp(
  req: Request,
  res: Response,
  next: NextFunction
) {
  OperationRepository.find({
    where: {
      numeroOperation: req.params.operation,
    },
    relations: ['reference', 'machine', 'mainDOeuvre'],
  })
    .then((operations) => res.status(200).json(operations))
    .catch((error) => {
      return res.status(500).json({
        error: 500,
        message: 'Erreur au niveau de votre demande !',
      });
    });
}

export function getOperationByComposite(
  req: Request,
  res: Response,
  next: NextFunction
) {
  OperationRepository.findOne(
    {
      numeroOperation: Number(req.params.operation),
      reference: {
        reference: req.params.reference,
      },
    },
    {
      relations: ['reference', 'machine', 'mainDOeuvre'],
    }
  )
    .then((operation) => {
      if (!operation) {
        return res.status(404).json({
          error: 404,
          param: `${req.params.reference}, ${req.params.operation}`,
          message: 'Operation not found !',
        });
      }
      res.status(200).json(operation);
    })
    .catch((error) => {
      return res.status(500).json({
        error: 500,
        message: 'Erreur au niveau de votre demande !',
      });
    });
}
