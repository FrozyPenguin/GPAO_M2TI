import { IsBoolean, IsDefined, IsInt, IsNumber, IsString, MaxLength, ValidateNested } from 'class-validator';
import { Check, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Operation } from "./Operation";

@Entity("Poste_de_charge")
@Check(`"machine" = 0 or "machine" = 1`)
@Check(`"type_taux_horaire_ou_forfait" = 'TH' or "type_taux_horaire_ou_forfait" = 'F'`)
export class PosteDeCharge {
  @PrimaryGeneratedColumn({ name: "poste_de_charge_id" })
  @IsNumber()
  @IsInt()
  @IsDefined() // Peut etre enlever puisqu'il est censé autoinc
  posteDeChargeId!: number;

  @Column("integer", { name: "numero_section" })
  @IsNumber()
  @IsInt()
  @IsDefined()
  numeroSection!: number;

  @Column("integer", { name: "numero_sous_section" })
  @IsNumber()
  @IsInt()
  @IsDefined()
  numeroSousSection!: number;

  @Column("boolean", { name: "machine" })
  @IsBoolean()
  @IsDefined()
  machine!: boolean;

  @Column("varchar", { name: "designation", nullable: true, length: 30 })
  @IsString()
  @MaxLength(30)
  designation!: string | null;

  @Column("integer", { name: "taux_horaire_ou_forfait", nullable: true })
  @IsNumber()
  @IsInt()
  tauxHoraireOuForfait!: number | null;

  @Column("integer", { name: "nombre_de_postes", nullable: true })
  @IsNumber()
  @IsInt()
  nombreDePostes!: number | null;

  @Column("integer", { name: "capacite_nominale", nullable: true })
  @IsNumber()
  @IsInt()
  capaciteNominale!: number | null;

  @Column("varchar", {
    name: "type_taux_horaire_ou_forfait",
    nullable: true,
    length: 2,
  })
  @IsString()
  @MaxLength(2)
  typeTauxHoraireOuForfait!: string | null;

  @OneToMany(
    () => Operation,
    (operation) => operation.machine,
    {
      eager: true
    }
  )
  @ValidateNested()
  machines!: Operation[];

  @OneToMany(
    () => Operation,
    (operation) => operation.mainDOeuvre,
    {
      eager: true
    }
  )
  @ValidateNested()
  mainDOeuvres!: Operation[];
}
