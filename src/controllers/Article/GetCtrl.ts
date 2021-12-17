import { Article } from '../../models/Article';
import { NextFunction, Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';

const ArticleRepository: Repository<Article> = getRepository(Article);

export function getArticles(req: Request, res: Response, next: NextFunction) {
  // Test: 'curl http://localhost:3000/api/GPAO/Articles'
  ArticleRepository.find({
    relations: ['composes', 'composants', 'operations', 'mouvementDeStocks'],
  })
    .then((articles) => res.status(200).json(articles))
    .catch((error) => {
      console.error(error);
      return res.status(500).json({
        error: 500,
        message: 'Erreur au niveau de votre demande !',
      });
    });
}

export function getArticle(req: Request, res: Response, next: NextFunction) {
  ArticleRepository.findOne(req.params.reference, {
    relations: ['composes', 'composants', 'operations', 'mouvementDeStocks'],
  })
    .then((article) => {
      if (!article) {
        return res.status(404).json({
          error: 404,
          param: req.params.reference,
          message: 'Article not found !',
        });
      }
      res.status(200).json(article);
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({
        error: 500,
        message: 'Erreur au niveau de votre demande !',
      });
    });
}
