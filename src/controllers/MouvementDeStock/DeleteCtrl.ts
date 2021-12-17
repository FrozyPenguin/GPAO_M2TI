import { MouvementDeStock } from './../../models/MouvementDeStock';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';

const MouvementDeStockRepository = getRepository(MouvementDeStock);

export async function deleteMouvementsDeStock(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const mouvement = await MouvementDeStockRepository.findOne(
      {
        periode: new Date(req.params.periode).toISOString(),
        reference: {
          reference: req.params.reference,
        },
      },
      {
        relations: ['reference'],
      }
    );

    if (!mouvement) {
      return res.status(404).json({
        error: 404,
        param: `${req.params.periode}, ${req.params.reference}`,
        message: 'Mouvement not found !',
      });
    }

    const removedMouvement = await MouvementDeStockRepository.remove(
      mouvement as MouvementDeStock
    );

    return res.status(200).json({
      message: `Mouvement supprimé (succès) : ${
        `${removedMouvement.reference}, ${removedMouvement.periode}` ||
        `${req.params.reference}, ${req.params.periode}`
      }`,
    });
  } catch (error) {
    return res.status(500).json({
      error: 500,
      message: 'Erreur au niveau de votre demande !',
    });
  }
}
