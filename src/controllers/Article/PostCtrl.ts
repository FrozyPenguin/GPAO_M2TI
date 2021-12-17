import { Article } from '../../models/Article';
import { NextFunction, Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import { validate, ValidationError } from 'class-validator';

const ArticleRepository: Repository<Article> = getRepository(Article);

export async function addArticle(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // console.log(JSON.stringify(request.body));
  // const article: Article = plainToInstance(Article, req.body);
  const article: Article = ArticleRepository.create(req.body as Article);

  try {
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

    const savedArticles: Article = await ArticleRepository.save(article);
    return res.status(201).json({
      message: 'Article validé (succès) : ' + savedArticles.reference,
    });
  } catch (error) {
    return res.status(500).json({
      error: 500,
      message: `Erreur au niveau de votre demande !`,
    });
  }
}
