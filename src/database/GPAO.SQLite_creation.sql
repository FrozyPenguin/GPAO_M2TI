create table Article (
	reference varchar(30) not null,
	designation varchar(30) not null,
	type_fabrication_achat varchar(30) not null,
	unite_achat_stock varchar(30) not null,
	delai_en_semaine INTEGER not null,
	prix_standard FLOAT,
	lot_de_reapprovisionnement INTEGER,
	stock_mini INTEGER,
	stock_maxi INTEGER,
	pourcentage_de_perte FLOAT, -- Définie que si MP et est égale à 0.05 TODO: regle JOI
	inventaire INTEGER,
	PF_ou_MP_ou_Pi_ou_SE varchar(2),
	constraint Articlepk primary key(reference),
	constraint Articleunique unique(designation),
	constraint ArticleCheck check(PF_ou_MP_ou_Pi_ou_SE = 'PF' or PF_ou_MP_ou_Pi_ou_SE = 'MP' or
                                PF_ou_MP_ou_Pi_ou_SE = 'Pi' or PF_ou_MP_ou_Pi_ou_SE = 'SE')
);

-- Table intermédiaire entre deux articles
create table Lien_de_nomenclature (
	lien_de_nomenclature_id INTEGER not null,
	compose varchar(30) not null, -- Un Article
	composant varchar(30) not null, -- Un autre article
	quantite_de_composition FLOAT not null,
	constraint Lien_de_nomenclature_pk primary key(lien_de_nomenclature_id),
	constraint Lien_de_nomenclature_fk_1 foreign key(compose) references Article(reference) on delete cascade,
	constraint Lien_de_nomenclature_fk_2 foreign key(composant) references Article(reference) on delete cascade,
	constraint Lien_de_nomenclature_check check(compose <> composant)
);

-- Table intermédiaire de Lien de nomenclature
create table Remplacement (
	remplace INTEGER not null,
	remplacant INTEGER not null,
	date_de_remplacement DATETIME,
	constraint Remplacement_pk primary key(remplace, remplacant),
	constraint Remplacement_fk_1 foreign key(remplace) references Lien_de_nomenclature(lien_de_nomenclature_id),
	constraint Remplacement_fk_2 foreign key(remplacant) references Lien_de_nomenclature(lien_de_nomenclature_id),
	constraint Remplacement_check check(remplace <> remplacant)
);


/*
create table Poste_de_charge (
	numero_section INTEGER,
	numero_sous_section INTEGER,
	machine INTEGER,
	designation varchar(30),
	taux_horaire_ou_forfait INTEGER,
	nombre_de_postes INTEGER,
	capacite_nominale INTEGER,
	type_taux_horaire_ou_forfait varchar(2),
	constraint Poste_de_charge_pk primary key(numero_section,numero_sous_section,machine),
	constraint Poste_de_charge_check_1 check(machine = 0 or machine = 1),
	constraint Poste_de_charge_check_2 check(type_taux_horaire_ou_forfait = 'TH' or type_taux_horaire_ou_forfait = 'F')

);

create table Operation (
	reference varchar(30),
	numero_operation INTEGER not null,
	temps_preparation INTEGER,
	temps_execution INTEGER,
	temps_transfert INTEGER,
	libelle_operation varchar(30) not null,
	main_d_oeuvre_numero_section INTEGER,
	main_d_oeuvre_numero_sous_section INTEGER,
	main_d_oeuvre_machine INTEGER,
	machine_numero_section INTEGER,
	machine_numero_sous_section INTEGER,
	machine_machine INTEGER,
	constraint Operation_pk primary key(reference, numero_operation),
	constraint Operation_fk1 foreign key(reference) references Article(reference) on delete cascade,
	constraint Main_d_oeuvre_fk foreign key(main_d_oeuvre_numero_section, main_d_oeuvre_numero_sous_section, main_d_oeuvre_machine) references Poste_de_charge(numero_section, numero_sous_section, machine) on delete cascade,
	constraint Machine_fk foreign key(machine_numero_section, machine_numero_sous_section, machine_machine) references Poste_de_charge(numero_section, numero_sous_section, machine) on delete cascade,
	constraint Operation_check check(main_d_oeuvre_numero_section <> machine_numero_section or main_d_oeuvre_numero_sous_section <> machine_numero_sous_section or main_d_oeuvre_machine <> machine_machine)
);
*/

create table Poste_de_charge (
	poste_de_charge_id INTEGER not null,
	numero_section INTEGER not null,
	numero_sous_section INTEGER not null,
	machine BOOLEAN not null,
	designation varchar(30),
	taux_horaire_ou_forfait INTEGER,
	nombre_de_postes INTEGER,
	capacite_nominale INTEGER,
	type_taux_horaire_ou_forfait varchar(2),
	constraint Poste_de_charge_pk primary key(poste_de_charge_id),
	constraint Poste_de_charge_check_1 check(machine = 0 or machine = 1),
	constraint Poste_de_charge_check_2 check(type_taux_horaire_ou_forfait = 'TH' or type_taux_horaire_ou_forfait = 'F'),
	constraint Unique_composite unique(numero_section, numero_sous_section, machine)
);

create table Operation (
	reference varchar(30) not null,
	numero_operation INTEGER not null,
	temps_preparation FLOAT,
	temps_execution FLOAT,
	temps_transfert FLOAT,
	libelle_operation varchar(30) not null,
	main_d_oeuvre INTEGER,
	machine INTEGER,
	constraint Operation_pk primary key(reference, numero_operation),
	constraint Operation_fk1 foreign key(reference) references Article(reference) on delete cascade,
	constraint Main_d_oeuvre_fk foreign key(main_d_oeuvre) references Poste_de_charge(poste_de_charge_id) on delete cascade,
	constraint Machine_fk foreign key(machine) references Poste_de_charge(poste_de_charge_id) on delete cascade,
	--constraint Operation_check_machine_main_oeuvre check(ifnull(main_d_oeuvre, machine) <> NULL)
	-- constraint Operation_check_machine_main_oeuvre check(if(main_d_oeuvre is null) machine is not null)
	constraint Operation_check_machine_main_oeuvre check(
		(main_d_oeuvre is null and machine is not null)
		or
		(machine is null and main_d_oeuvre is not null)
		or
		(machine is not null and main_d_oeuvre is not null)
	) -- ca ça marche
	constraint Operation_check_machine_main_oeuvre_diff check(main_d_oeuvre <> machine)
);

create table Mouvement_de_stock (
	reference varchar(30) not null,
	numero_magasin INTEGER not null,
	quantite INTEGER not null,
	periode TEXT not null,
	entree_ou_sortie INTEGER not null,
	constraint Mouvement_de_stock_pk primary key(reference, periode, entree_ou_sortie),
	constraint Mouvement_de_stock_fk foreign key(reference) references Article(reference) on delete cascade,
	constraint Mouvement_de_stock_check check(entree_ou_sortie = 0 or entree_ou_sortie = 1)
);



insert into Article values('ROUE50','roue de camion','achat par lot','unite',6,1.5,500,500,2000,null,1850,'Pi');
insert into Article values('ES000','essieu monte','fabr. par lot','unite',2,null,500,750,1500,null,null,'SE');
insert into Article values('CH005','chassis monte','fabr. par lot','unite',1,null,300,null,900,null,null,'SE');

insert into Article values('H000','conteneur bleu','fabr. par lot','unite',1,null,150,350,800,null,null,'SE');
insert into Article values('H001','conteneur bleu special','fabr. a la commande','unite',1,null,150,350,null,null,null,'SE');

insert into Article values('CD100','camion demenagement bleu','pf fabr. par lot','unite',2,null,200,null,600,null,null,'PF');

insert into Lien_de_nomenclature values(null, 'ES000','ROUE50',2);
insert into Lien_de_nomenclature values(null, 'CH005','ES000',2);
insert into Lien_de_nomenclature values(null, 'CD100','CH005',1);

insert into Lien_de_nomenclature values(null, 'CD100','H000',1);
insert into Lien_de_nomenclature values(null, 'CD100','H001',1);

insert into Remplacement select ln1.lien_de_nomenclature_id, ln2.lien_de_nomenclature_id, date('now') from Lien_de_nomenclature as ln1, Lien_de_nomenclature as ln2
where ln1.compose = 'CD100' and ln2.compose = 'CD100' and ln1.composant = 'H000' and ln2.composant = 'H001';

insert into Poste_de_charge values(null,500,450,1,'Rectifieuse',80,1,39,'TH');
insert into Poste_de_charge values(null,500,450,0,'Rectifieur',80,1,39,'TH');
insert into Poste_de_charge values(null,550,450,0,'test1Poste',80,1,39,'TH');
insert into Poste_de_charge values(null,600,500,0,'test2Poste',80,1,39,'TH');
insert into Poste_de_charge values(null,500,800,1,'test3Poste',80,1,39,'TH');

insert into Operation
select 'ES000',20,0.5,0.05,0.2,'Rectification',main_d_oeuvre.poste_de_charge_id,machine.poste_de_charge_id
from Poste_de_charge as machine,Poste_de_charge as main_d_oeuvre
where machine.designation = 'Rectifieuse' and main_d_oeuvre.designation = 'Rectifieur';
insert into Operation values('ROUE50',30,0.5,0.05,0.2,'test1Operation',3,5);
insert into Operation values('ROUE50',40,0.5,0.05,0.2,'test2Operation',4,5);
insert into Operation values('ROUE50',50,0.5,0.05,0.2,'test3Operation',4,3);

insert into Mouvement_de_stock values('ROUE50', 3, 30, '2021-12-17T04:53:59.000Z', 1);
insert into Mouvement_de_stock values('CH005', 1, 20, '2021-12-17T04:53:52.000Z', 0);
insert into Mouvement_de_stock values('CD100', 3, 40, '2021-12-17T04:53:55.000Z', 1);
