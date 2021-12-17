import { validate, ValidationError } from 'class-validator';
import { MouvementDeStock } from './../../models/MouvementDeStock';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Article } from './../../models/Article';

const MouvementDeStockRepository = getRepository(MouvementDeStock);

export async function addMouvementsDeStock(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;
    const ArticleRepository = getRepository(Article);

    const reference = await ArticleRepository.findOne(body.reference);

    if (!reference) {
      return res.status(404).json({
        error: 404,
        message: `Article de reference non trouvé (échec) : ${body.reference}`,
      });
    }

    const mouvement: MouvementDeStock = MouvementDeStockRepository.create({
      ...body,
      periode: new Date().toISOString(),
    } as MouvementDeStock);

    const errors: ValidationError[] = await validate(mouvement, {
      skipMissingProperties: true,
    });
    if (errors.length > 0) {
      return res.status(400).json({
        error: 400,
        message: `Mouvement invalidé (échec) : ${errors
          .map((error) => error.toString())
          .join(', ')}`,
      });
    }

    const savedMouvement: MouvementDeStock =
      await MouvementDeStockRepository.save(mouvement);
    return res.status(201).json({
      message: `Mouvement validé (succès) : ${savedMouvement.reference}, ${savedMouvement.periode}`,
    });
  } catch (error) {
    return res.status(500).json({
      error: 500,
      message: `Erreur au niveau de votre demande !`,
    });
  }
}
