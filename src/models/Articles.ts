import * as Joi from 'joi';

export enum ArticleType {
  MP = 'MP',
  PF = 'PF',
  Piece = 'Piece',
  SE = 'SE',
}

export interface Article {
  reference: string;
  designation: string;
  type_fabrication_achat: string;
  unite_achat_stock: string;
  delai_en_semaine: number;
  prix_standard?: number;
  lot_de_reapprovisionnement?: number;
  stock_mini?: number;
  stock_maxi?: number;
  pourcentage_de_perte?: number;
  inventaire?: number;
  PF_ou_MP_ou_Piece_ou_SE: ArticleType;
}

export const articles = Joi.object({
  reference: Joi.string().alphanum().required().min(4).max(10),
  designation: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9 ]*$'))
    .required()
    .max(30),
  type_fabrication_achat: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9. ]*$'))
    .required()
    .max(30),
  unite_achat_stock: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9 ]*$'))
    .required()
    .max(30),
  delai_en_semaine: Joi.number().integer().required(),
  prix_standard: Joi.number(),
  lot_de_reapprovisionnement: Joi.number().integer(),
  stock_mini: Joi.number().integer(),
  stock_maxi: Joi.number().integer(),
  pourcentage_de_perte: Joi.number(),
  inventaire: Joi.number().integer(),
  PF_ou_MP_ou_Piece_ou_SE: Joi.string().valid(
    ArticleType.MP,
    ArticleType.PF,
    ArticleType.Piece,
    ArticleType.SE
  ),
});