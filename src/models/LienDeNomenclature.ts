import { IsDefined, IsNumber, ValidateNested } from "class-validator";
import { Check, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Article } from "./Article";
import { Remplacement } from "./Remplacement";

@Entity("Lien_de_nomenclature")
@Check(`"compose" <> "composant"`)
export class LienDeNomenclature {
  @PrimaryGeneratedColumn({ name: "lien_de_nomenclature_id" })
  @IsNumber()
  @IsDefined()
  lienDeNomenclatureId!: number;

  @Column("float", { name: "quantite_de_composition" })
  @IsNumber()
  @IsDefined()
  quantiteDeComposition!: number;

  @ManyToOne(() => Article, (article) => article.composants, {
    onDelete: "CASCADE"
  })
  @JoinColumn([{ name: "composant", referencedColumnName: "reference" }])
  @ValidateNested()
  composant!: Article;

  @ManyToOne(() => Article, (article) => article.composes, {
    onDelete: "CASCADE"
  })
  @JoinColumn([{ name: "compose", referencedColumnName: "reference" }])
  @ValidateNested()
  compose!: Article;

  @OneToMany(
    () => Remplacement,
    (remplacement) => remplacement.remplace,
    {
      eager: true
    }
  )
  @ValidateNested()
  remplacements!: Remplacement[];
}