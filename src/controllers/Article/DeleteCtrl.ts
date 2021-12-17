import { NextFunction, Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import { Article } from '../../models/Article';

const ArticleRepository: Repository<Article> = getRepository(Article);

export async function deleteArticle(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const article = await ArticleRepository.findOne(req.params.reference);

    if (!article) {
      return res.status(404).json({
        error: 404,
        param: req.params.reference,
        message: 'Article not found !',
      });
    }

    const removeArticle = await ArticleRepository.remove(article as Article);
    return res.status(200).json({
      message: `Article supprimé (succès) : ${
        removeArticle.reference || req.params.reference
      }`,
    });
  } catch (error) {
    return res.status(500).json({
      error: 500,
      message: 'Erreur au niveau de votre demande !',
    });
  }
}
