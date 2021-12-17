import { Router } from 'express';
import {
  deletePosteDeCharge,
  deletePosteDeChargeByComposite,
} from '../../../controllers/PosteDeCharge/DeleteCtrl';
import {
  getPosteDeCharges,
  getPosteDeChargeById,
  getPosteDeChargeByNSection,
  getPosteDeChargeByNSousSection,
  getPosteDeChargeByMachine,
  getPosteDeChargeByComposite,
} from '../../../controllers/PosteDeCharge/GetCtrl';
import { addPosteDeCharge } from '../../../controllers/PosteDeCharge/PostCtrl';
import {
  updatePosteDeCharge,
  updatePosteDeChargeByComposite,
} from '../../../controllers/PosteDeCharge/PutCtrl';

const router = Router();

// -------------------------------------------------
//                    Get Multiple
// -------------------------------------------------
router.get('/', getPosteDeCharges);

router.get('/nsection/:nsection', getPosteDeChargeByNSection);

router.get('/nsoussection/:nsoussection', getPosteDeChargeByNSousSection);

router.get('/machine/:machine', getPosteDeChargeByMachine);

// -------------------------------------------------
//                    Get Single
// -------------------------------------------------
router.get('/id/:id', getPosteDeChargeById);

router.get(
  '/nsection/:nsection/nsoussection/:nsoussection/machine/:machine',
  getPosteDeChargeByComposite
);

router.post('/add', addPosteDeCharge);

router.put('/id/:id', updatePosteDeCharge);

router.put(
  '/nsection/:nsection/nsoussection/:nsoussection/machine/:machine',
  updatePosteDeChargeByComposite
);

router.delete('/id/:id', deletePosteDeCharge);

router.delete(
  '/nsection/:nsection/nsoussection/:nsoussection/machine/:machine',
  deletePosteDeChargeByComposite
);

export default router;
