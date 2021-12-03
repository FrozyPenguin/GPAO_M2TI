import { Article } from './Articles';

export interface Remplacement {
  // remplace !== remplacant
  remplace_compose: Article; // key(remplace_compose, remplace_composant, remplacant_compose, remplacant_composant)
  remplace_composant: Article;
  remplacant_compose: Article;
  remplacant_composant: Article;
  date_de_remplacement: Date;
}
