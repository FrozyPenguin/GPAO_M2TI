import { PosteDeCharge } from './../../models/PosteDeCharge';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';

const PosteDeChargeRepository = getRepository(PosteDeCharge);

export function getPosteDeCharges(
  req: Request,
  res: Response,
  next: NextFunction
) {
  PosteDeChargeRepository.find({
    relations: ['machines', 'mainDOeuvres'],
  })
    .then((posteDeCharge) => res.status(200).json(posteDeCharge))
    .catch((error) => {
      return res.status(500).json({
        error: 500,
        message: 'Erreur au niveau de votre demande !',
      });
    });
}

export function getPosteDeChargeById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  PosteDeChargeRepository.findOne({
    where: { posteDeChargeId: req.params.id },
    relations: ['machines', 'mainDOeuvres'],
  })
    .then((posteDeCharge) => res.status(200).json(posteDeCharge))
    .catch((error) => {
      return res.status(500).json({
        error: 500,
        message: 'Erreur au niveau de votre demande !',
      });
    });
}

export function getPosteDeChargeByNSection(
  req: Request,
  res: Response,
  next: NextFunction
) {
  PosteDeChargeRepository.find({
    where: { numeroSection: req.params.nsection },
    relations: ['machines', 'mainDOeuvres'],
  })
    .then((posteDeCharge) => res.status(200).json(posteDeCharge))
    .catch((error) => {
      return res.status(500).json({
        error: 500,
        message: 'Erreur au niveau de votre demande !',
      });
    });
}

export function getPosteDeChargeByNSousSection(
  req: Request,
  res: Response,
  next: NextFunction
) {
  PosteDeChargeRepository.find({
    where: { numeroSousSection: req.params.nsoussection },
    relations: ['machines', 'mainDOeuvres'],
  })
    .then((posteDeCharge) => res.status(200).json(posteDeCharge))
    .catch((error) => {
      return res.status(500).json({
        error: 500,
        message: 'Erreur au niveau de votre demande !',
      });
    });
}

export function getPosteDeChargeByMachine(
  req: Request,
  res: Response,
  next: NextFunction
) {
  PosteDeChargeRepository.find({
    where: { machine: req.params.machine },
    relations: ['machines', 'mainDOeuvres'],
  })
    .then((posteDeCharge) => res.status(200).json(posteDeCharge))
    .catch((error) => {
      return res.status(500).json({
        error: 500,
        message: 'Erreur au niveau de votre demande !',
      });
    });
}

export function getPosteDeChargeByComposite(
  req: Request,
  res: Response,
  next: NextFunction
) {
  PosteDeChargeRepository.find({
    where: {
      numeroSection: Number(req.params.nsection),
      numeroSousSection: Number(req.params.nsoussection),
      machine: Boolean(req.params.machine),
    },
    relations: ['machines', 'mainDOeuvres'],
  })
    .then((posteDeCharge) => res.status(200).json(posteDeCharge))
    .catch((error) => {
      return res.status(500).json({
        error: 500,
        message: 'Erreur au niveau de votre demande !',
      });
    });
}
