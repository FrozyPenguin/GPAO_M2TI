import { validate, ValidationError } from 'class-validator';
import { Remplacement } from './../../models/Remplacement';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { LienDeNomenclature } from './../../models/LienDeNomenclature';

const RemplacementRepository = getRepository(Remplacement);

export async function addRemplacement(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;

    if (body.remplace === body.remplacant) {
      return res.status(400).json({
        error: 400,
        message: `Les references ne peuvent pas être identique (échec) : ${body.remplace}, ${body.remplacant}`,
      });
    }

    const LienDeNomenclatureRepository = getRepository(LienDeNomenclature);

    const lienRemplace = await LienDeNomenclatureRepository.findOne(
      body.remplace,
      {
        relations: ['composant', 'compose'],
      }
    );
    const lienRemplacant = await LienDeNomenclatureRepository.findOne(
      body.remplacant,
      {
        relations: ['composant', 'compose'],
      }
    );

    if (!lienRemplace || !lienRemplacant) {
      return res.status(404).json({
        error: 404,
        message: `Combinaison de lien de nomenclature non trouvé (échec) : ${body.remplace}, ${body.remplacant}`,
      });
    }

    const remplacement: Remplacement = RemplacementRepository.create(
      body as Remplacement
    );

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

    const savedRemplacament: Remplacement = await RemplacementRepository.save(
      remplacement
    );
    return res.status(201).json({
      message: `Remplacement validé (succès) : ${savedRemplacament.remplace}, ${savedRemplacament.remplacant}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 500,
      message: `Erreur au niveau de votre demande !`,
    });
  }
}
