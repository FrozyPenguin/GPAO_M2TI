# Introduction

Pour ce projet nous avons choisi d'utiliser une base de données SQLite.
Pour ceci, nous avons étudié le cachier des charges ainsi que le script sql Oracle fourni afin de préparer un script de création adapté à SQLite.

En mode développement (variable d'environnement PRODUCTION=false), la base de données est regénérée à chaque lancement du serveur en suivant les fichiers GPAO_SQLite_Creation.sql et GPAO_SQLite_Deletion.sql.
En mode production, la base de donnée est initialisé avec des valeurs fictive afin de pouvoir tester l'api en condition quasi réel.

En utilisant Insomnia, nous pouvons tester les différentes routes du service afin d'en voir les fonctionnalités.
Le fichier JSON Insomnia_2021-12-17.json peut être importé afin de directement pouvoir utiliser nos requêtes de test de manière graphique sans avoir à les réecrire.

Toutes les routes sont définies dans le dossier __"routes"__, séparées selon les modèles (entities) concernés.
Pour les modèles et la connection à la base de donnée nous avons utilisé **TypeORM** ainsi que **class_validator** pour les vérifications de données insérées.

Nous avons utilisé **ts-node** pour travailler en TypeScript sans avoir à recompiler manuellement le code et nodemon pour relancer le serveur automatiquement après chaque modification.
Enfin, Il est possible d'accéder à la définition des routes à l'adresse 127.0.0.0:3000/swagger.

# Execution

Le projet peut s'éxécuter de la manière suivante :

## Dev
- npm run dev

## Production
- npm run comp  
- npm start

# Liste des routes

## Articles

- GET /api/GPAO/Articles

- GET /api/GPAO/Articles/:reference

- POST /api/GPAO/Articles/add

- PUT /api/GPAO/Articles/:reference

- DELETE /api/GPAO/Articles/:reference


## Lien de Nomenclature

- GET /api/GPAO/LienDeNomenclatures

- GET /api/GPAO/LienDeNomenclatures/composant/:reference

- GET /api/GPAO/LienDeNomenclatures/compose/:reference

- GET /api/GPAO/LienDeNomenclatures/:id

- GET /api/GPAO/LienDeNomenclatures/compose/:referenceCompose/composant/:referenceComposant

- POST /api/GPAO/LienDeNomenclatures/add

- PUT /api/GPAO/LienDeNomenclatures/:id

- PUT /api/GPAO/LienDeNomenclatures/compose/:compose/composant/:composant

- DELETE /api/GPAO/LienDeNomenclatures/:id

- DELETE /api/GPAO/LienDeNomenclatures/compose/:compose/composant/:composant


## Mouvements de stocks

- GET /api/GPAO/MouvementsDeStocks

- GET /api/GPAO/MouvementsDeStocks/reference/:reference

- GET /api/GPAO/MouvementsDeStocks/periode/:periode

- GET /api/GPAO/MouvementsDeStocks/reference/:reference/periode/:periode

- POST /api/GPAO/MouvementsDeStocks/add

- PUT /api/GPAO/MouvementsDeStocks/reference/:reference/periode/:periode

- DELETE /api/GPAO/MouvementsDeStocks/reference/:reference/periode/:periode


## Operations

- GET /api/GPAO/Operations

- GET /api/GPAO/Operations/reference/:reference

- GET /api/GPAO/Operations/operation/:operation

- GET /api/GPAO/Operations/reference/:reference/operation/:operation

- POST /api/GPAO/Operations/add

- PUT /api/GPAO/Operations/reference/:reference/operation/:operation

- DELETE /api/GPAO/Operations/reference/:reference/operation/:operation


## Poste de charges

- GET /api/GPAO/PosteDeCharges

- GET /api/GPAO/PosteDeCharges/nsection/:nsection

- GET /api/GPAO/PosteDeCharges/nsoussection/:nsoussection

- GET /api/GPAO/PosteDeCharges/machine/:machine

- GET /api/GPAO/PosteDeCharges/id/:id

- GET /api/GPAO/PosteDeCharges/nsection/:nsection/nsoussection/:nsoussection/machine/:machine

- POST /api/GPAO/PosteDeCharges/add

- PUT /api/GPAO/PosteDeCharges/id/:id

- PUT /api/GPAO/PosteDeCharges/nsection/:nsection/nsoussection/:nsoussection/machine/:machine

- DELETE /api/GPAO/PosteDeCharges/id/:id

- DELETE /api/GPAO/PosteDeCharges/nsection/:nsection/nsoussection/:nsoussection/machine/:machine


## Remplacements

- GET /api/GPAO/Remplacements

- GET /api/GPAO/Remplacements/remplace/:remplace

- GET /api/GPAO/Remplacements/remplacant/:remplacant

- GET /api/GPAO/Remplacements/remplace/:remplace/remplacant/:remplacant

- POST /api/GPAO/Remplacements/add

- PUT /api/GPAO/Remplacements/remplace/:remplace/remplacant/:remplacant

- DELETE /api/GPAO/Remplacements/remplace/:remplace/remplacant/:remplacant


## Index

- GET /