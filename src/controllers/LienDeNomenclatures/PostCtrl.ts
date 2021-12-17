import { Article } from './../../models/Article';
import { validate, ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { LienDeNomenclature } from '../../models/LienDeNomenclature';

const LienDeNomenclatureRepository = getRepository(LienDeNomenclature);

// -------------------------------------------------
//                        Post
// -------------------------------------------------
export async function addLienDeNomenclature(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;

    if (body.compose === body.composant) {
      return res.status(400).json({
        error: 400,
        message: `Les references ne peuvent pas être identique (échec) : ${body.compose}, ${body.composant}`,
      });
    }

    const ArticleRepository = getRepository(Article);

    const articleCompose = await ArticleRepository.findOne(body.compose);
    const articleComposant = await ArticleRepository.findOne(body.composant);

    if (!articleCompose || !articleComposant) {
      return res.status(404).json({
        error: 404,
        message: `Combinaison d'article non trouvé (échec) : ${body.compose}, ${body.composant}`,
      });
    }

    // body.compose = articleCompose;
    // body.composant = articleComposant;

    const lien: LienDeNomenclature = LienDeNomenclatureRepository.create(
      body as LienDeNomenclature
    );

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

    const savedLien: LienDeNomenclature =
      await LienDeNomenclatureRepository.save(lien);
    return res.status(201).json({
      message: 'Lien validé (succès) : ' + savedLien.lienDeNomenclatureId,
    });
  } catch (error) {
    return res.status(500).json({
      error: 500,
      message: `Erreur au niveau de votre demande !`,
    });
  }
}
