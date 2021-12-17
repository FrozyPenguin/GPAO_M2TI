import { Router } from 'express';
import {
  deleteLienDeNomenclature,
  deleteLienDeNomenclatureByCompositeKey,
} from '../../../controllers/LienDeNomenclatures/DeleteCtrl';
import { addLienDeNomenclature } from '../../../controllers/LienDeNomenclatures/PostCtrl';
import {
  updateLienDeNomenclature,
  updateLienDeNomenclatureByCompositeKey,
} from '../../../controllers/LienDeNomenclatures/PutCtrl';
import {
  getLienDeNomenclature,
  getLienDeNomenclatureByCompositeKey,
  getLienDeNomenclatures,
  getLienDeNomenclaturesByComposant,
  getLienDeNomenclaturesByCompose,
} from '../../../controllers/LienDeNomenclatures/GetCtrl';

const router = Router();

// -------------------------------------------------
//                    Multiple
// -------------------------------------------------
router.get('/', getLienDeNomenclatures);

router.get('/composant/:reference', getLienDeNomenclaturesByComposant);

router.get('/compose/:reference', getLienDeNomenclaturesByCompose);

// -------------------------------------------------
//                    Single
// -------------------------------------------------
router.get('/:id', getLienDeNomenclature);

router.get(
  '/compose/:referenceCompose/composant/:referenceComposant',
  getLienDeNomenclatureByCompositeKey
);

router.post('/add', addLienDeNomenclature);

router.put('/:id', updateLienDeNomenclature);

router.put(
  '/compose/:compose/composant/:composant',
  updateLienDeNomenclatureByCompositeKey
);

router.delete('/:id', deleteLienDeNomenclature);

router.delete(
  '/compose/:compose/composant/:composant',
  deleteLienDeNomenclatureByCompositeKey
);

export default router;
