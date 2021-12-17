import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { LienDeNomenclature } from '../../models/LienDeNomenclature';

const LienDeNomenclatureRepository = getRepository(LienDeNomenclature);

// -------------------------------------------------
//                        Delete
// -------------------------------------------------
// /:id
export async function deleteLienDeNomenclature(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const lien = await LienDeNomenclatureRepository.findOne(req.params.id);

    if (!lien) {
      return res.status(404).json({
        error: 404,
        param: req.params.reference,
        message: 'Lien not found !',
      });
    }

    const removedLien = await LienDeNomenclatureRepository.remove(
      lien as LienDeNomenclature
    );
    return res.status(200).json({
      message:
        'Article supprimé (succès) : ' + removedLien.lienDeNomenclatureId ||
        req.params.id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 500,
      message: 'Erreur au niveau de votre demande !',
    });
  }
}

// /compose/:compose/composant/:composant
export async function deleteLienDeNomenclatureByCompositeKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const lien = await LienDeNomenclatureRepository.findOne({
      composant: {
        reference: req.params.composant,
      },
      compose: {
        reference: req.params.compose,
      },
    });

    if (!lien) {
      return res.status(404).json({
        error: 404,
        param: `${req.params.compose}, ${req.params.composant}`,
        message: 'Lien not found !',
      });
    }

    const removedLien = await LienDeNomenclatureRepository.remove(
      lien as LienDeNomenclature
    );
    return res.status(200).json({
      message: `Lien supprimé (succès) : ${
        `${removedLien.compose}, ${removedLien.composant}` ||
        `${req.params.compose}, ${req.params.composant}`
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
