import { Remplacement } from './../../models/Remplacement';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { LienDeNomenclature } from './../../models/LienDeNomenclature';

const RemplacementRepository = getRepository(Remplacement);

export async function updateRemplacement(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const remplacementToUpdate = await RemplacementRepository.findOne({
      remplace: {
        lienDeNomenclatureId: Number(req.params.remplace),
      },
      remplacant: {
        lienDeNomenclatureId: Number(req.params.remplacant),
      },
    });

    if (!remplacementToUpdate) {
      return res.status(404).json({
        error: 404,
        param: `${req.params.remplace}, ${req.params.remplacant}`,
        message: 'Remplacement not found !',
      });
    }

    const body = req.body;

    if (body.remplace && body.remplacant && body.remplace === body.remplacant) {
      return res.status(400).json({
        error: 400,
        message: `Les references ne peuvent pas être identique (échec) : ${body.remplace}, ${body.remplacant}`,
      });
    }

    const LienDeNomenclatureRepository = getRepository(LienDeNomenclature);

    let combinationError = {
      error: false,
      causeBy: [] as string[],
    };

    if (body.remplace) {
      const LienRemplace = await LienDeNomenclatureRepository.findOne(
        body.remplace
      );
      // if (LienRemplace) body.remplace = LienRemplace;
      if (!LienRemplace) {
        combinationError.error = true;
        combinationError.causeBy.push(body.remplace);
      }
    }

    if (body.remplacant) {
      const LienRemplacant = await LienDeNomenclatureRepository.findOne(
        body.remplacant
      );
      // if (LienRemplacant) body.remplacant = LienRemplacant;
      if (!LienRemplacant) {
        combinationError.error = true;
        combinationError.causeBy.push(body.remplacant);
      }
    }

    if (combinationError.error) {
      return res.status(404).json({
        error: 404,
        message: `Remplace et/ou remplacant introuvable (échec) : ${combinationError.causeBy.join(
          ', '
        )}`,
      });
    }

    const remplacement: Remplacement = RemplacementRepository.create({
      ...remplacementToUpdate,
      ...body,
    } as Remplacement);

    const errors: ValidationError[] = await validate(remplacement, {
      skipMissingProperties: true,
    });
    if (errors.length > 0) {
      return res.status(400).json({
        error: 400,
        message: `Remplacement invalidé (échec) : ${errors
          .map((error) => error.toString())
          .join(', ')}`,
      });
    }

    const result = await RemplacementRepository.update(
      {
        remplace: {
          lienDeNomenclatureId: Number(req.params.remplace),
        },
        remplacant: {
          lienDeNomenclatureId: Number(req.params.remplacant),
        },
      },
      remplacement
    );

    if (!result.affected || result.affected < 1) throw new Error('Not saved');

    return res.status(201).json({
      message: `Remplacement mis à jour (succès) : ${
        `${remplacement.remplace}, ${remplacement.remplacant}` ||
        `${req.params.remplace}, ${req.params.remplacant}`
      }`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 500,
      message: 'Erreur au niveau de votre demande !',
    });
  }
}
