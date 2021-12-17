import { Article } from '../../models/Article';
import { NextFunction, Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';

const ArticleRepository: Repository<Article> = getRepository(Article);

export async function updateArticle(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const articleToUpdate = await ArticleRepository.findOne(
      req.params.reference
    );

    if (!articleToUpdate) {
      return res.status(404).json({
        error: 404,
        param: req.params.reference,
        message: 'Article not found !',
      });
    }

    const article: Article = plainToInstance(Article, {
      ...articleToUpdate,
      ...req.body,
    });

    console.log(article);

    const errors: ValidationError[] = await validate(article, {
      skipMissingProperties: true,
    });
    if (errors.length > 0) {
      return res.status(400).json({
        error: 400,
        message: `Article invalidé (échec) : ${errors
          .map((error) => error.toString())
          .join(', ')}`,
      });
    }

    const updatedArticles: Article = await ArticleRepository.save(article);
    return res.status(201).json({
      message: 'Article mis à jour (succès) : ' + updatedArticles.reference,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 500,
      message: 'Erreur au niveau de votre demande !',
    });
  }
}
