import { PosteDeCharge } from './../../models/PosteDeCharge';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate, ValidationError } from 'class-validator';

const PosteDeChargeRepository = getRepository(PosteDeCharge);

export async function updatePosteDeCharge(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const posteDeChargeToUpDate = await PosteDeChargeRepository.findOne(
      req.params.id
    );

    if (!posteDeChargeToUpDate) {
      return res.status(404).json({
        error: 404,
        param: req.params.id,
        message: 'Poste de charge not found !',
      });
    }

    const body = req.body;

    const posteDeCharge: PosteDeCharge = PosteDeChargeRepository.create({
      ...posteDeChargeToUpDate,
      ...body,
    } as PosteDeCharge);

    const errors: ValidationError[] = await validate(posteDeCharge, {
      skipMissingProperties: true,
    });
    if (errors.length > 0) {
      return res.status(400).json({
        error: 400,
        message: `Poste de charge invalidé (échec) : ${errors
          .map((error) => error.toString())
          .join(', ')}`,
      });
    }

    const result = await PosteDeChargeRepository.save(posteDeCharge);
    //if (!result.affected || result.affected < 1) throw new Error('Not saved');

    return res.status(201).json({
      message: `Poste de charge mis à jour (succès): ${result.posteDeChargeId}`,
    });
  } catch (error) {
    return res.status(500).json({
      error: 500,
      message: 'Erreur au niveau de votre demande !',
    });
  }
}

export async function updatePosteDeChargeByComposite(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const posteDeChargeToUpDate = await PosteDeChargeRepository.findOne({
      numeroSection: Number(req.params.nsection),
      numeroSousSection: Number(req.params.nsoussection),
      machine: Boolean(Number(req.params.machine)),
    });

    if (!posteDeChargeToUpDate) {
      return res.status(404).json({
        error: 404,
        param: `${req.params.nsection}, ${req.params.nsoussection}, ${req.params.machine}`,
        message: 'Poste de charge not found !',
      });
    }

    const body = req.body;

    const posteDeCharge: PosteDeCharge = PosteDeChargeRepository.create({
      ...posteDeChargeToUpDate,
      ...body,
    } as PosteDeCharge);

    const errors: ValidationError[] = await validate(posteDeCharge, {
      skipMissingProperties: true,
    });
    if (errors.length > 0) {
      return res.status(400).json({
        error: 400,
        message: `Poste de charge invalidé (échec) : ${errors
          .map((error) => error.toString())
          .join(', ')}`,
      });
    }

    const result = await PosteDeChargeRepository.save(posteDeCharge);
    //if (!result.affected || result.affected < 1) throw new Error('Not saved');

    return res.status(201).json({
      message: `Poste de charge mis à jour (succès): ${result.posteDeChargeId}`,
    });
  } catch (error) {
    return res.status(500).json({
      error: 500,
      message: 'Erreur au niveau de votre demande !',
    });
  }
}
