import * as Joi from 'joi';
import { Article } from './Articles';

// TODO: Ajouter des règles de validation Joi sans doute
export interface LienDeNomenclature {
  // compose !== composant
  compose: Article; // key(compose, composant),
  composant: Article;
  quantite_de_composition: number;
}

// TODO: create Entity

export const lienDeNomenclature = Joi.object({
  compose: Joi.string().alphanum().required().min(4).max(10),
  composant: Joi.string().alphanum().required().min(4).max(10),
  quantite_de_composition: Joi.number().required(),
});
Joi.expression('{{compose != composant}}');
