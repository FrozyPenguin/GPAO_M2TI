import { IsDate, IsDefined, ValidateNested } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  PrimaryColumn,
  Check,
} from 'typeorm';
import { LienDeNomenclature } from './LienDeNomenclature';

@Entity('Remplacement')
@Check(`"remplace" <> "remplacant"`)
export class Remplacement {
  @PrimaryColumn('integer', { primary: true, name: 'remplace' })
  @ManyToOne(
    () => LienDeNomenclature,
    (lienDeNomenclature) => lienDeNomenclature.remplacements
  )
  @JoinColumn([
    { name: 'remplace', referencedColumnName: 'lienDeNomenclatureId' },
  ])
  @ValidateNested()
  @IsDefined()
  remplace!: LienDeNomenclature;

  @PrimaryColumn('integer', { primary: true, name: 'remplacant' })
  @ManyToOne(
    () => LienDeNomenclature,
    (lienDeNomenclature) => lienDeNomenclature.remplacements
  )
  @JoinColumn([
    { name: 'remplacant', referencedColumnName: 'lienDeNomenclatureId' },
  ])
  @ValidateNested()
  @IsDefined()
  remplacant!: LienDeNomenclature;

  @CreateDateColumn({ name: 'date_de_remplacement', nullable: true })
  @IsDate()
  dateDeRemplacement!: Date | null;
}
