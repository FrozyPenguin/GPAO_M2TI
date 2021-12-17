import { Remplacement } from './../../models/Remplacement';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';

const RemplacementRepository = getRepository(Remplacement);

export async function deleteRemplacement(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const remplacement = await RemplacementRepository.findOne({
      remplace: {
        lienDeNomenclatureId: Number(req.params.remplace),
      },
      remplacant: {
        lienDeNomenclatureId: Number(req.params.remplacant),
      },
    });

    if (!remplacement) {
      return res.status(404).json({
        error: 404,
        param: `${req.params.remplace}, ${req.params.remplacant}`,
        message: 'Remplacement not found !',
      });
    }

    const removedRemplacement = await RemplacementRepository.remove(
      remplacement as Remplacement
    );
    return res.status(200).json({
      message: `Remplacement supprimé (succès) : ${
        `${removedRemplacement.remplace}, ${removedRemplacement.remplacant}` ||
        `${req.params.remplace}, ${req.params.remplacant}`
      }`,
    });
  } catch (error) {
    return res.status(500).json({
      error: 500,
      message: 'Erreur au niveau de votre demande !',
    });
  }
}
