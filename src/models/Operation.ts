import {
  Check,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { PosteDeCharge } from './PosteDeCharge';
import { Article } from './Article';
import {
  IsDecimal,
  IsDefined,
  IsInt,
  IsNumber,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

@Entity('Operation')
@Check(`ifnull("main_d_oeuvre", "machine") <> NULL`)
export class Operation {
  @ManyToOne(() => Article, (article) => article.operations, {
    onDelete: 'CASCADE',
    primary: true,
  })
  @JoinColumn([{ name: 'reference', referencedColumnName: 'reference' }])
  @ValidateNested()
  @IsDefined()
  reference!: Article;

  @PrimaryColumn('integer', { name: 'numero_operation' })
  @IsNumber()
  @IsInt()
  @IsDefined()
  numeroOperation!: number;

  @Column('float', { name: 'temps_preparation', nullable: true })
  @IsNumber()
  @IsDecimal()
  tempsPreparation!: number | null;

  @Column('float', { name: 'temps_execution', nullable: true })
  @IsNumber()
  @IsDecimal()
  tempsExecution!: number | null;

  @Column('float', { name: 'temps_transfert', nullable: true })
  @IsNumber()
  @IsDecimal()
  tempsTransfert!: number | null;

  @Column('varchar', { name: 'libelle_operation', length: 30 })
  @IsString()
  @MaxLength(30)
  libelleOperation!: string;

  @ManyToOne(() => PosteDeCharge, (posteDeCharge) => posteDeCharge.machines, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'machine', referencedColumnName: 'posteDeChargeId' }])
  @ValidateNested()
  machine!: PosteDeCharge;

  @ManyToOne(
    () => PosteDeCharge,
    (posteDeCharge) => posteDeCharge.mainDOeuvres,
    {
      onDelete: 'CASCADE',
    }
  )
  @JoinColumn([
    { name: 'main_d_oeuvre', referencedColumnName: 'posteDeChargeId' },
  ])
  @ValidateNested()
  mainDOeuvre!: PosteDeCharge;
}
