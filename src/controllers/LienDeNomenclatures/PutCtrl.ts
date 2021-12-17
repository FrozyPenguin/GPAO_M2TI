import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { Article } from '../../models/Article';
import { getRepository } from 'typeorm';
import { LienDeNomenclature } from '../../models/LienDeNomenclature';

const LienDeNomenclatureRepository = getRepository(LienDeNomenclature);

// -------------------------------------------------
//                        Update
// -------------------------------------------------
// /:id
export async function updateLienDeNomenclature(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const lienToUpdate = await LienDeNomenclatureRepository.findOne(
      req.params.id
    );

    if (!lienToUpdate) {
      return res.status(404).json({
        error: 404,
        param: req.params.id,
        message: 'Lien not found !',
      });
    }

    const body = req.body;

    if (body.compose && body.composant && body.compose === body.composant) {
      return res.status(400).json({
        error: 400,
        message: `Les references ne peuvent pas être identique (échec) : ${body.compose}, ${body.composant}`,
      });
    }

    const ArticleRepository = getRepository(Article);

    let combinationError = {
      error: false,
      causeBy: [] as string[],
    };

    if (body.compose) {
      const articleCompose = await ArticleRepository.findOne(body.compose);
      if (articleCompose) body.compose = articleCompose;
      else {
        combinationError.error = true;
        combinationError.causeBy.push(body.compose);
      }
    }

    if (body.composant) {
      const articleComposant = await ArticleRepository.findOne(body.composant);
      if (articleComposant) body.composant = articleComposant;
      else {
        combinationError.error = true;
        combinationError.causeBy.push(body.composant);
      }
    }

    if (combinationError.error) {
      return res.status(404).json({
        error: 404,
        message: `Compose et/ou composant introuvable (échec) : ${combinationError.causeBy.join(
          ', '
        )}`,
      });
    }

    const lien: LienDeNomenclature = plainToInstance(LienDeNomenclature, {
      ...lienToUpdate,
      ...body,
    });

    console.log(lien);

    const errors: ValidationError[] = await validate(lien, {
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

    const updatedLien: LienDeNomenclature =
      await LienDeNomenclatureRepository.save(lien);
    return res.status(201).json({
      message: `Lien mis à jour (succès) : ${updatedLien.lienDeNomenclatureId}`,
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
export async function updateLienDeNomenclatureByCompositeKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const lienToUpdate = await LienDeNomenclatureRepository.findOne({
      composant: {
        reference: req.params.composant,
      },
      compose: {
        reference: req.params.compose,
      },
    });

    if (!lienToUpdate) {
      return res.status(404).json({
        error: 404,
        param: `${req.params.compose}, ${req.params.composant}`,
        message: 'Lien not found !',
      });
    }

    const body = req.body;

    if (body.compose && body.composant && body.compose === body.composant) {
      return res.status(400).json({
        error: 400,
        message: `Les references ne peuvent pas être identique (échec) : ${body.compose}, ${body.composant}`,
      });
    }

    const ArticleRepository = getRepository(Article);

    let combinationError = {
      error: false,
      causeBy: [] as string[],
    };

    if (body.compose) {
      const articleCompose = await ArticleRepository.findOne(body.compose);
      if (articleCompose) body.compose = articleCompose;
      else {
        combinationError.error = true;
        combinationError.causeBy.push(body.compose);
      }
    }

    if (body.composant) {
      const articleComposant = await ArticleRepository.findOne(body.composant);
      if (articleComposant) body.composant = articleComposant;
      else {
        combinationError.error = true;
        combinationError.causeBy.push(body.composant);
      }
    }

    if (combinationError.error) {
      console.log(combinationError);
      return res.status(404).json({
        error: 404,
        message: `Compose et/ou composant introuvable (échec) : ${combinationError.causeBy.join(
          ', '
        )}`,
      });
    }

    const lien: LienDeNomenclature = plainToInstance(LienDeNomenclature, {
      ...lienToUpdate,
      ...body,
    });

    const errors: ValidationError[] = await validate(lien, {
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

    const updatedLien: LienDeNomenclature =
      await LienDeNomenclatureRepository.save(lien);
    return res.status(201).json({
      message: `Lien mis à jour (succès) : ${
        `${updatedLien.compose.reference}, ${updatedLien.composant.reference}` ||
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
