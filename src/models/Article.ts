import { Check, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { LienDeNomenclature } from "./LienDeNomenclature";
import { Operation } from "./Operation";
import { MouvementDeStock } from "./MouvementDeStock";
import { IsAlphanumeric, IsDecimal, IsDefined, IsEnum, IsInt, IsNumber, IsString, Length, Matches, MaxLength, ValidateNested } from "class-validator";

export enum ArticleType {
  MP = 'MP',
  PF = 'PF',
  Piece = 'Piece',
  SE = 'SE',
}

@Entity("Article")
@Check(`"PF_ou_MP_ou_Pi_ou_SE" = 'PF' or "PF_ou_MP_ou_Pi_ou_SE" = 'MP' or "PF_ou_MP_ou_Pi_ou_SE" = 'Pi' or "PF_ou_MP_ou_Pi_ou_SE" = 'SE'`)
export class Article {
  @PrimaryColumn("varchar", {
    primary: true,
    name: "reference",
    length: 30,
    unique: true,
  })
  @IsString()
  @IsAlphanumeric()
  @IsDefined()
  @Length(4, 10)
  reference!: string;

  @Column("varchar", {
    name: "designation",
    nullable: true,
    length: 30,
    unique: true,
  })
  @IsString()
  @Matches(new RegExp('^[a-zA-Z0-9. ]*$'))
  @MaxLength(30)
  @IsDefined()
  designation!: string;

  @Column("varchar", { name: "type_fabrication_achat", length: 30 })
  @IsString()
  @Matches(new RegExp('^[a-zA-Z0-9. ]*$'))
  @MaxLength(30)
  @IsDefined()
  typeFabricationAchat!: string;

  @Column("varchar", { name: "unite_achat_stock", length: 30 })
  @IsString()
  @Matches(new RegExp('^[a-zA-Z0-9. ]*$'))
  @MaxLength(30)
  @IsDefined()
  uniteAchatStock!: string;

  @Column("integer", { name: "delai_en_semaine" })
  @IsNumber()
  @IsInt()
  @IsDefined()
  delaiEnSemaine!: number;

  @Column("float", { name: "prix_standard", nullable: true })
  @IsNumber()
  @IsDecimal()
  prixStandard!: number | null;

  @Column("integer", { name: "lot_de_reapprovisionnement", nullable: true })
  @IsNumber()
  @IsInt()
  lotDeReapprovisionnement!: number | null;

  @Column("integer", { name: "stock_mini", nullable: true })
  @IsNumber()
  @IsInt()
  stockMini!: number | null;

  @Column("integer", { name: "stock_maxi", nullable: true })
  @IsNumber()
  @IsInt()
  stockMaxi!: number | null;

  @Column("float", { name: "pourcentage_de_perte", nullable: true })
  @IsNumber()
  @IsDecimal()
  pourcentageDePerte!: number | null;

  @Column("integer", { name: "inventaire", nullable: true })
  @IsNumber()
  @IsInt()
  inventaire!: number | null;

  @Column("varchar", {
    name: "PF_ou_MP_ou_Pi_ou_SE",
    nullable: true,
    length: 2,
  })
  @IsEnum(ArticleType)
  pfOuMpOuPiOuSe!: ArticleType | null;

  @OneToMany(
    () => LienDeNomenclature,
    (lienDeNomenclature) => lienDeNomenclature.composant,
    {
      eager: true
    }
  )
  @ValidateNested()
  composants!: LienDeNomenclature[];

  @OneToMany(
    () => LienDeNomenclature,
    (lienDeNomenclature) => lienDeNomenclature.compose,
    {
      eager: true
    }
  )
  @ValidateNested()
  composes!: LienDeNomenclature[];

  @OneToMany(
    () => Operation,
    (operation) => operation.reference,
    {
      eager: true
    }
  )
  @ValidateNested()
  operations!: Operation[];

  @OneToMany(
    () => MouvementDeStock,
    (mouvementDeStock) => mouvementDeStock.reference,
    {
      eager: true
    }
  )
  @ValidateNested()
  mouvementDeStocks!: MouvementDeStock[];
}
