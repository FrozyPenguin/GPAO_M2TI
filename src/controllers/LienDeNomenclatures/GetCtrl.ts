import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { LienDeNomenclature } from '../../models/LienDeNomenclature';

const LienDeNomenclatureRepository = getRepository(LienDeNomenclature);

// -------------------------------------------------
//                    Get Multiple
// -------------------------------------------------
export function getLienDeNomenclatures(
  req: Request,
  res: Response,
  next: NextFunction
) {
  LienDeNomenclatureRepository.find({
    relations: ['composant', 'compose', 'remplacements'],
  })
    .then((lien) => res.status(200).json(lien))
    .catch((error) => {
      console.error(error);
      return res.status(500).json({
        error: 500,
        message: 'Erreur au niveau de votre demande !',
      });
    });
}

// /compose/:reference
export function getLienDeNomenclaturesByComposant(
  req: Request,
  res: Response,
  next: NextFunction
) {
  LienDeNomenclatureRepository.find({
    where: {
      composant: {
        reference: req.params.reference,
      },
    },
    relations: ['composant', 'compose', 'remplacements'],
  })
    .then((liens) => {
      res.status(200).json(liens);
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({
        error: 500,
        message: 'Erreur au niveau de votre demande !',
      });
    });
}

// /composant/:reference
export function getLienDeNomenclaturesByCompose(
  req: Request,
  res: Response,
  next: NextFunction
) {
  LienDeNomenclatureRepository.find({
    where: {
      compose: {
        reference: req.params.reference,
      },
    },
    relations: ['composant', 'compose', 'remplacements'],
  })
    .then((liens) => {
      res.status(200).json(liens);
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({
        error: 500,
        message: 'Erreur au niveau de votre demande !',
      });
    });
}

// -------------------------------------------------
//                    Get Single
// -------------------------------------------------
// /:id
export function getLienDeNomenclature(
  req: Request,
  res: Response,
  next: NextFunction
) {
  LienDeNomenclatureRepository.findOne(req.params.id, {
    relations: ['composant', 'compose', 'remplacements'],
  })
    .then((lien) => {
      if (!lien) {
        return res.status(404).json({
          error: 404,
          param: req.params.id,
          message: 'Lien de nomenclature not found !',
        });
      }
      res.status(200).json(lien);
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({
        error: 500,
        message: 'Erreur au niveau de votre demande !',
      });
    });
}

// /compose/:referenceCompose/composant/:referenceComposant
export function getLienDeNomenclatureByCompositeKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  LienDeNomenclatureRepository.findOne(
    {
      composant: {
        reference: req.params.referenceComposant,
      },
      compose: {
        reference: req.params.referenceCompose,
      },
    },
    {
      relations: ['composant', 'compose', 'remplacements'],
    }
  )
    .then((lien) => {
      if (!lien) {
        return res.status(404).json({
          error: 404,
          param: `${req.params.referenceCompose}, ${req.params.referenceComposant}`,
          message: 'Lien de nomenclature not found !',
        });
      }
      res.status(200).json(lien);
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({
        error: 500,
        message: 'Erreur au niveau de votre demande !',
      });
    });
}
