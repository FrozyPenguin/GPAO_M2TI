import { validate, ValidationError } from 'class-validator';
import { PosteDeCharge } from './../../models/PosteDeCharge';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Operation } from 'src/models/Operation';

const PosteDeChargeRepository = getRepository(PosteDeCharge);

export async function addPosteDeCharge(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  const posteDeCharge: PosteDeCharge = PosteDeChargeRepository.create(
    body as PosteDeCharge
  );

  try {
    const errors: ValidationError[] = await validate(posteDeCharge, {
      skipMissingProperties: true,
    });
    if (errors.length > 0) {
      return res.status(400).json({
        error: 400,
        message: `Poste de charge invalide (échec) : ${errors
          .map((error) => error.toString())
          .join(', ')}`,
      });
    }

    const savedPosteDeCharge: PosteDeCharge =
      await PosteDeChargeRepository.save(posteDeCharge);
    return res.status(201).json({
      message: 'Poste de charge validé (succès)',
    });
  } catch (error) {
    return res.status(500).json({
      error: 500,
      message: 'Erreur au niveau de votre demande !',
    });
  }
}
