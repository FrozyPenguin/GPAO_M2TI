import {
  IsDefined,
  IsInstance,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import {
  Check,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Article } from './Article';
import { Remplacement } from './Remplacement';

@Entity('Lien_de_nomenclature')
@Check(`"compose" <> "composant"`)
export class LienDeNomenclature {
  @PrimaryGeneratedColumn({ name: 'lien_de_nomenclature_id' })
  @IsNumber()
  lienDeNomenclatureId!: number;

  @Column('float', { name: 'quantite_de_composition' })
  @IsNumber()
  @IsDefined()
  quantiteDeComposition!: number;

  @ManyToOne(() => Article, (article) => article.composants, {
    onDelete: 'CASCADE',
    eager: false,
  })
  @JoinColumn([{ name: 'composant', referencedColumnName: 'reference' }])
  @IsDefined()
  composant!: Article;

  @ManyToOne(() => Article, (article) => article.composes, {
    onDelete: 'CASCADE',
    eager: false,
  })
  @JoinColumn([{ name: 'compose', referencedColumnName: 'reference' }])
  @IsDefined()
  compose!: Article;

  @OneToMany(() => Remplacement, (remplacement) => remplacement.remplace, {
    eager: false,
  })
  @ValidateNested()
  remplacements!: Remplacement[];

  // @RelationId((lien: LienDeNomenclature) => lien.composant)
  // composantId!: string;

  // @RelationId((lien: LienDeNomenclature) => lien.compose)
  // composeId!: string;
}
