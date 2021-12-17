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
@Check(
  `("main_d_oeuvre" is null and "machine" is not null) or ("machine" is null and "main_d_oeuvre" is not null) or ("machine" is not null and "main_d_oeuvre" is not null)`
)
@Check(`"main_d_oeuvre" <> "machine"`)
export class Operation {
  @ManyToOne(() => Article, (article) => article.operations, {
    onDelete: 'CASCADE',
    primary: true,
  })
  @JoinColumn([{ name: 'reference', referencedColumnName: 'reference' }])
  @IsDefined()
  reference!: Article;

  @PrimaryColumn('integer', { name: 'numero_operation' })
  @IsNumber()
  @IsInt()
  @IsDefined()
  numeroOperation!: number;

  @Column('float', { name: 'temps_preparation', nullable: true })
  @IsNumber()
  tempsPreparation!: number | null;

  @Column('float', { name: 'temps_execution', nullable: true })
  @IsNumber()
  tempsExecution!: number | null;

  @Column('float', { name: 'temps_transfert', nullable: true })
  @IsNumber()
  tempsTransfert!: number | null;

  @Column('varchar', { name: 'libelle_operation', length: 30 })
  @IsString()
  @MaxLength(30)
  libelleOperation!: string;

  @ManyToOne(() => PosteDeCharge, (posteDeCharge) => posteDeCharge.machines, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([{ name: 'machine', referencedColumnName: 'posteDeChargeId' }])
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
  mainDOeuvre!: PosteDeCharge;
}
