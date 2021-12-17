import { MouvementDeStock } from './../../models/MouvementDeStock';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Article } from './../../models/Article';

const MouvementDeStockRepository = getRepository(MouvementDeStock);

export async function updateMouvementsDeStock(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const mouvementToUpdate = await MouvementDeStockRepository.findOne(
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

    if (!mouvementToUpdate) {
      return res.status(404).json({
        error: 404,
        param: `${req.params.periode}, ${req.params.reference}`,
        message: 'Mouvement not found !',
      });
    }

    const body = req.body;
    const ArticleRepository = getRepository(Article);

    const reference = await ArticleRepository.findOne(body.reference);

    if (!reference) {
      return res.status(404).json({
        error: 404,
        message: `Article de reference non trouvé (échec) : ${body.reference}`,
      });
    }

    const mouvement: MouvementDeStock = plainToInstance(MouvementDeStock, {
      ...mouvementToUpdate,
      ...body,
      periode: mouvementToUpdate.periode.toISOString(),
    });

    const errors: ValidationError[] = await validate(mouvement, {
      skipMissingProperties: true,
    });
    if (errors.length > 0) {
      return res.status(400).json({
        error: 400,
        message: `Lien invalidé (échec) : ${errors
          .map((error) => error.toString())
          .join(', ')}`,
      });
    }

    const result = await MouvementDeStockRepository.update(
      {
        periode: new Date(req.params.periode).toISOString(),
        reference: {
          reference: req.params.reference,
        },
      },
      mouvement
    );

    if (!result.affected || result.affected < 1) throw new Error('Not saved');

    return res.status(201).json({
      message: `Lien mis à jour (succès) : ${
        `${mouvement.reference}, ${mouvement.periode}` ||
        `${req.params.reference}, ${req.params.periode}`
      }`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 500,
      message: 'Erreur au niveau de votre demande !',
    });
  }
}
