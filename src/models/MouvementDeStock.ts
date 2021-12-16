import { IsDate, IsDefined, IsInt, IsNumber, ValidateNested } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, CreateDateColumn, Check, PrimaryColumn } from "typeorm";
import { Article } from "./Article";

@Entity("Mouvement_de_stock")
@Check(`"entree_ou_sortie" = 0 or "entree_ou_sortie" = 1`)
export class MouvementDeStock {
  @ManyToOne(() => Article, (article) => article.mouvementDeStocks, {
    onDelete: "CASCADE",
    primary: true
  })
  @JoinColumn([{ name: "reference", referencedColumnName: "reference" }])
  @ValidateNested()
  @IsDefined()
  reference!: Article;

  @Column("integer", { name: "numero_magasin" })
  @IsNumber()
  @IsInt()
  @IsDefined()
  numeroMagasin!: number;

  @Column("integer", { name: "quantite" })
  @IsNumber()
  @IsInt()
  @IsDefined()
  quantite!: number;

  // Ca je sais pas
  @PrimaryColumn("datetime", { name: "periode" })
  @CreateDateColumn({ primary: true, name: "periode" })
  @IsDate()
  periode!: Date;

  @PrimaryColumn("integer", { name: "entree_ou_sortie" })
  @IsNumber()
  @IsInt()
  @IsDefined()
  entreeOuSortie!: number;
}
