# Routes List


## Articles

GET /api/GPAO/Articles

GET /api/GPAO/Articles/:reference

POST /api/GPAO/Articles/add

PUT /api/GPAO/Articles/:reference

DELETE /api/GPAO/Articles/:reference


## Lien de Nomenclature

GET /api/GPAO/LienDeNomenclatures

GET /api/GPAO/LienDeNomenclatures/composant/:reference

GET /api/GPAO/LienDeNomenclatures/compose/:reference

GET /api/GPAO/LienDeNomenclatures/:id

GET /api/GPAO/LienDeNomenclatures/compose/:referenceCompose/composant/:referenceComposant

POST /api/GPAO/LienDeNomenclatures/add

PUT /api/GPAO/LienDeNomenclatures/:id

PUT /api/GPAO/LienDeNomenclatures/compose/:compose/composant/:composant

DELETE /api/GPAO/LienDeNomenclatures/:id

DELETE /api/GPAO/LienDeNomenclatures/compose/:compose/composant/:composant


## Mouvements de stocks

GET /api/GPAO/MouvementsDeStocks

GET /api/GPAO/MouvementsDeStocks/reference/:reference

GET /api/GPAO/MouvementsDeStocks/periode/:periode

GET /api/GPAO/MouvementsDeStocks/reference/:reference/periode/:periode

POST /api/GPAO/MouvementsDeStocks/add

PUT /api/GPAO/MouvementsDeStocks/reference/:reference/periode/:periode

DELETE /api/GPAO/MouvementsDeStocks/reference/:reference/periode/:periode


## Operations

GET /api/GPAO/Operations

GET /api/GPAO/Operations/reference/:reference

GET /api/GPAO/Operations/operation/:operation

GET /api/GPAO/Operations/reference/:reference/operation/:operation

POST /api/GPAO/Operations/add

PUT /api/GPAO/Operations/reference/:reference/operation/:operation

DELETE /api/GPAO/Operations/reference/:reference/operation/:operation


## Poste de charges

GET /api/GPAO/PosteDeCharges

GET /api/GPAO/PosteDeCharges/nsection/:nsection

GET /api/GPAO/PosteDeCharges/nsoussection/:nsoussection

GET /api/GPAO/PosteDeCharges/machine/:machine

GET /api/GPAO/PosteDeCharges/id/:id

GET /api/GPAO/PosteDeCharges/nsection/:nsection/nsoussection/:nsoussection/machine/:machine

POST /api/GPAO/PosteDeCharges/add

PUT /api/GPAO/PosteDeCharges/id/:id

PUT /api/GPAO/PosteDeCharges/nsection/:nsection/nsoussection/:nsoussection/machine/:machine

DELETE /api/GPAO/PosteDeCharges/id/:id

DELETE /api/GPAO/PosteDeCharges/nsection/:nsection/nsoussection/:nsoussection/machine/:machine


## Remplacements

GET /api/GPAO/Remplacements

GET /api/GPAO/Remplacements/remplace/:remplace

GET /api/GPAO/Remplacements/remplacant/:remplacant

GET /api/GPAO/Remplacements/remplace/:remplace/remplacant/:remplacant

POST /api/GPAO/Remplacements/add

PUT /api/GPAO/Remplacements/remplace/:remplace/remplacant/:remplacant

DELETE /api/GPAO/Remplacements/remplace/:remplace/remplacant/:remplacant


## Index

GET /