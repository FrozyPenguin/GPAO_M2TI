import { PosteDeCharge } from './../../models/PosteDeCharge';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';

const PosteDeChargeRepository = getRepository(PosteDeCharge);

export async function deletePosteDeCharge(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const posteDeCharge = await PosteDeChargeRepository.findOne(req.params.id);

    if (!posteDeCharge) {
      return res.status(404).json({
        error: 404,
        param: req.params.id,
        message: 'Poste de charge not found !',
      });
    }

    const removePosteDeCharge = await PosteDeChargeRepository.remove(
      posteDeCharge as PosteDeCharge
    );
    return res.status(200).json({
      message: `Poste de charge supprimé (succès) : ${
        removePosteDeCharge.posteDeChargeId || req.params.id
      }`,
    });
  } catch (error) {
    return res.status(500).json({
      error: 500,
      message: 'Erreur au niveau de votre demande !',
    });
  }
}

export async function deletePosteDeChargeByComposite(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const posteDeCharge = await PosteDeChargeRepository.findOne({
      numeroSection: Number(req.params.nsection),
      numeroSousSection: Number(req.params.nsoussection),
      machine: Boolean(Number(req.params.machine)),
    });

    if (!posteDeCharge) {
      return res.status(404).json({
        error: 404,
        param: `${req.params.nsection}, ${req.params.nsoussection}, ${req.params.machine}`,
        message: 'Poste de charge not found !',
      });
    }

    const removePosteDeCharge = await PosteDeChargeRepository.remove(
      posteDeCharge as PosteDeCharge
    );
    return res.status(200).json({
      message: `Poste de charge supprimé (succès) : ${
        `${removePosteDeCharge.numeroSection}, ${removePosteDeCharge.numeroSousSection}, ${removePosteDeCharge.machine}` ||
        `${req.params.nsection}, ${req.params.nsoussection}, ${req.params.machine}`
      }`,
    });
  } catch (error) {
    return res.status(500).json({
      error: 500,
      message: 'Erreur au niveau de votre demande !',
    });
  }
}
