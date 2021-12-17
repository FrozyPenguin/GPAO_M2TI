import { MouvementDeStock } from './../../models/MouvementDeStock';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';

const MouvementDeStockRepository = getRepository(MouvementDeStock);

export function getMouvementsDeStocks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  MouvementDeStockRepository.find({
    relations: ['reference'],
  })
    .then((mouvements) => res.status(200).json(mouvements))
    .catch((error) => {
      console.error(error);
      return res.status(500).json({
        error: 500,
        message: 'Erreur au niveau de votre demande !',
      });
    });
}

export function getMouvementsDeStocksByRef(
  req: Request,
  res: Response,
  next: NextFunction
) {
  MouvementDeStockRepository.find({
    where: {
      reference: req.params.reference,
    },
    relations: ['reference'],
  })
    .then((mouvements) => res.status(200).json(mouvements))
    .catch((error) => {
      console.error(error);
      return res.status(500).json({
        error: 500,
        message: 'Erreur au niveau de votre demande !',
      });
    });
}

export function getMouvementsDeStocksByPeriod(
  req: Request,
  res: Response,
  next: NextFunction
) {
  MouvementDeStockRepository.find({
    where: {
      periode: new Date(req.params.periode).toISOString(),
    },
    relations: ['reference'],
  })
    .then((mouvements) => res.status(200).json(mouvements))
    .catch((error) => {
      console.error(error);
      return res.status(500).json({
        error: 500,
        message: 'Erreur au niveau de votre demande !',
      });
    });
}

export function getMouvementsDeStockByComposite(
  req: Request,
  res: Response,
  next: NextFunction
) {
  MouvementDeStockRepository.findOne(
    {
      periode: new Date(req.params.periode).toISOString(),
      reference: {
        reference: req.params.reference,
      },
    },
    {
      relations: ['reference'],
    }
  )
    .then((mouvement) => {
      if (!mouvement) {
        return res.status(404).json({
          error: 404,
          param: `${req.params.reference}, ${req.params.periode}`,
          message: 'Mouvement de stock not found !',
        });
      }
      res.status(200).json(mouvement);
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({
        error: 500,
        message: 'Erreur au niveau de votre demande !',
      });
    });
}
