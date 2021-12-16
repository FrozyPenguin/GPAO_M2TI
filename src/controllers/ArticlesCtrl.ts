import { NextFunction, Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import { Article, ArticleType } from '../models/Article';

const ArticleRepository: Repository<Article> = getRepository(Article);

export async function getArticles(req: Request, res: Response, next: NextFunction) {
  // Test: 'curl http://localhost:3000/api/GPAO/Articles'
  res.json(await ArticleRepository.find());
}

export async function getArticle(req: Request, res: Response, next: NextFunction) {
  const article = await ArticleRepository.findOne(req.params.reference);
  console.log(req.params.reference);
  console.log(article);
  if(!article) {
    res
      .status(404)
      .json({
        error: 404,
        param: req.params.reference,
        message: 'Article not found !'
      });
  }
  res.send(article);
}

export function addArticle(req: Request, res: Response, next: NextFunction) {
  /* Création article (Windows 10) :
      $CC201 = @{
          reference = 'CC201'
          designation = 'Camion citerne rouge'
          type_fabrication_achat = 'Fab. a la commande'
          unite_achat_stock = 'unite'
          delai_en_semaine = 2
          lot_de_reapprovisionnement = 150
          stock_maxi = 600
          PF_ou_MP_ou_Piece_ou_SE = 'PF'
      }|ConvertTo-Json
      echo $CC201
      */
  /* (Windows 10) :
      $Nouvel_article = @{
          Body        = $CC201
          ContentType = 'application/json'
          Method      = 'POST'
          Uri         = 'http://localhost:1963/api/GPAO/Nouvel_article'
      }
      */
  /* (Windows 10) :
      Invoke-RestMethod @Nouvel_article
      */
  // console.log(JSON.stringify(request.body));
  const article: Article = req.body;

  // const { error, value } = articles.validate({
  //   reference: article.reference, // Unicity required as well...
  //   designation: article.designation, // Unicity required as well...
  //   type_fabrication_achat: article.type_fabrication_achat,
  //   unite_achat_stock: article.unite_achat_stock,
  //   delai_en_semaine: article.delai_en_semaine,
  //   lot_de_reapprovisionnement: article.lot_de_reapprovisionnement,
  //   stock_maxi: article.stock_maxi,
  //   PF_ou_MP_ou_Piece_ou_SE: article.PF_ou_MP_ou_Piece_ou_SE,
  // });

  // if (error === undefined) {
  //   res.status(201).json({
  //     message: 'Article validé (succès) : ' + value.reference,
  //   });
  //   Articles.push(article);
  // } else {
  //   res.status(400).json({
  //     message: 'Article invalidé (échec) : ' + error.message,
  //   });
  // }
}

export function deleteArticle(req: Request, res: Response, next: NextFunction) {
  res.status(500).json({
    error: 'Not yet implemented !',
  });
}

export function updateArticle(req: Request, res: Response, next: NextFunction) {
  res.status(500).json({
    error: 'Not yet implemented !',
  });
}
