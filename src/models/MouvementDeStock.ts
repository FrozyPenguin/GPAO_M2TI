import {
  IsDate,
  IsDateString,
  IsDefined,
  IsInt,
  IsNumber,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  Check,
  PrimaryColumn,
  Generated,
} from 'typeorm';
import { Article } from './Article';

@Entity('Mouvement_de_stock')
@Check(`"entree_ou_sortie" = 0 or "entree_ou_sortie" = 1`)
export class MouvementDeStock {
  @ManyToOne(() => Article, (article) => article.mouvementDeStocks, {
    onDelete: 'CASCADE',
    primary: true,
  })
  @JoinColumn([{ name: 'reference', referencedColumnName: 'reference' }])
  @IsDefined()
  reference!: Article;

  @Column('integer', { name: 'numero_magasin' })
  @IsNumber()
  @IsInt()
  @IsDefined()
  numeroMagasin!: number;

  @Column('integer', { name: 'quantite' })
  @IsNumber()
  @IsInt()
  @IsDefined()
  quantite!: number;

  @PrimaryColumn('text', { name: 'periode' })
  @IsDateString()
  periode!: Date;

  @PrimaryColumn('integer', { name: 'entree_ou_sortie' })
  @IsNumber()
  @IsInt()
  @Min(0)
  @Max(1)
  @IsDefined()
  entreeOuSortie!: number;
}
