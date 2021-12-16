import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { NextFunction, Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import { Article } from '../models/Article';

const ArticleRepository: Repository<Article> = getRepository(Article);

export function getArticles(req: Request, res: Response, next: NextFunction) {
  // Test: 'curl http://localhost:3000/api/GPAO/Articles'
  ArticleRepository.find().then(articles => res.status(200).json(articles))
  .catch(error => {
    console.error(error);
    return res
      .status(500)
      .json({
        error: 500,
        message: 'Erreur au niveau de votre demande !'
      });
  });
}

export function getArticle(req: Request, res: Response, next: NextFunction) {
  ArticleRepository.findOne(req.params.reference)
  .then(article => {
    if(!article) {
      return res
        .status(404)
        .json({
          error: 404,
          param: req.params.reference,
          message: 'Article not found !'
        });
    }
    res.status(200).json(article);
  })
  .catch(error => {
    console.error(error);
    return res
      .status(500)
      .json({
        error: 500,
        message: 'Erreur au niveau de votre demande !'
      });
  });
}

// TODO: Pour faire des ajout encapsulé peut etre problème
export async function addArticle(req: Request, res: Response, next: NextFunction) {
  // console.log(JSON.stringify(request.body));
  const article: Article = plainToInstance(Article, req.body);

  try {
    const errors: ValidationError[] = await validate(article, { skipMissingProperties: true });
    if(errors.length > 0) {
      return res
        .status(400)
        .json({
          error: 400,
          message: `Article invalidé (échec) : ${ errors.map(error => error.toString()).join(', ') }`
        });
    }

    const savedArticles: Article = await ArticleRepository.save(article);
    return res
      .status(201)
      .json({
        message: 'Article validé (succès) : ' + savedArticles.reference,
      });
  }
  catch(error) {
    return res
      .status(500)
      .json({
        error: 500,
        message: `Erreur au niveau de votre demande !`
      });
  }
}

export async function deleteArticle(req: Request, res: Response, next: NextFunction) {
  try {
    const article = await ArticleRepository.findOne(req.params.reference);

    if(!article) {
      return res
        .status(404)
        .json({
          error: 404,
          param: req.params.reference,
          message: 'Article not found !'
        });
    }

    const removeArticle = await ArticleRepository.remove(article as Article);
    return res
      .status(200)
      .json({
        message: 'Article supprimé (succès) : ' + removeArticle.reference || req.params.reference,
      });
  }
  catch(error) {
    console.error(error);
    return res
      .status(500)
      .json({
        error: 500,
        message: 'Erreur au niveau de votre demande !'
      });
  }
}

export async function updateArticle(req: Request, res: Response, next: NextFunction) {
  try {
    const articleToUpdate = await ArticleRepository.findOne(req.params.reference);

    if(!articleToUpdate) {
      return res
        .status(404)
        .json({
          error: 404,
          param: req.params.reference,
          message: 'Article not found !'
        });
    }

    const article: Article = plainToInstance(Article, {
      ...articleToUpdate,
      ...req.body
    });

    console.log(article)

    const errors: ValidationError[] = await validate(article, { skipMissingProperties: true });
    if(errors.length > 0) {
      return res
        .status(400)
        .json({
          error: 400,
          message: `Article invalidé (échec) : ${ errors.map(error => error.toString()).join(', ') }`
        });
    }

    const updatedArticles: Article = await ArticleRepository.save(article);
    return res
      .status(201)
      .json({
        message: 'Article mis à jour (succès) : ' + updatedArticles.reference,
      });
  }
  catch(error) {
    console.error(error);
    return res
      .status(500)
      .json({
        error: 500,
        message: 'Erreur au niveau de votre demande !'
      });
  }
}
