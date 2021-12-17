import { Remplacement } from './../../models/Remplacement';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';

const RemplacementRepository = getRepository(Remplacement);

export function getRemplacements(
  req: Request,
  res: Response,
  next: NextFunction
) {
  RemplacementRepository.find({
    relations: ['remplace', 'remplacant'],
  })
    .then((remplacements) => res.status(200).json(remplacements))
    .catch((error) => {
      return res.status(500).json({
        error: 500,
        message: 'Erreur au niveau de votre demande !',
      });
    });
}

export function getRemplacementsByRemplace(
  req: Request,
  res: Response,
  next: NextFunction
) {
  RemplacementRepository.find({
    where: {
      remplace: {
        lienDeNomenclatureId: Number(req.params.remplace),
      },
    },
    relations: ['remplace', 'remplacant'],
  })
    .then((remplacements) => {
      res.status(200).json(remplacements);
    })
    .catch((error) => {
      return res.status(500).json({
        error: 500,
        message: 'Erreur au niveau de votre demande !',
      });
    });
}

export function getRemplacementsByRemplacant(
  req: Request,
  res: Response,
  next: NextFunction
) {
  RemplacementRepository.find({
    where: {
      remplacant: {
        lienDeNomenclatureId: Number(req.params.remplacant),
      },
    },
    relations: ['remplace', 'remplacant'],
  })
    .then((remplacements) => {
      res.status(200).json(remplacements);
    })
    .catch((error) => {
      return res.status(500).json({
        error: 500,
        message: 'Erreur au niveau de votre demande !',
      });
    });
}

export function getRemplacementsByComposite(
  req: Request,
  res: Response,
  next: NextFunction
) {
  RemplacementRepository.findOne(
    {
      remplace: {
        lienDeNomenclatureId: Number(req.params.remplace),
      },
      remplacant: {
        lienDeNomenclatureId: Number(req.params.remplacant),
      },
    },
    {
      relations: ['remplace', 'remplacant'],
    }
  )
    .then((remplacement) => {
      if (!remplacement) {
        return res.status(404).json({
          error: 404,
          param: `${req.params.remplace}, ${req.params.remplacant}`,
          message: 'Remplacement not found !',
        });
      }
      res.status(200).json(remplacement);
    })
    .catch((error) => {
      return res.status(500).json({
        error: 500,
        message: 'Erreur au niveau de votre demande !',
      });
    });
}
