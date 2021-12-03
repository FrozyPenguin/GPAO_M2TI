import { Router } from 'express';
import {
  addPosteDeCharge,
  deletePosteDeCharge,
  getPosteDeCharge,
  getPosteDeCharges,
  updatePosteDeCharge,
} from '../../../controllers/PosteDeChargesCtrl';

const router = Router();

// Test: 'curl http://localhost:3000/api/GPAO/PosteDeCharges'
router.get('/', getPosteDeCharges);

// Test: 'curl http://localhost:3000/api/GPAO/PosteDeCharges/CD100'
// TODO: Voir comment on peut filtrer
router.get(':reference', getPosteDeCharge);

// Test: 'curl http://localhost:3000/api/GPAO/PosteDeCharges/add'
router.post('add', addPosteDeCharge);

// TODO: Voir comment on peut filtrer
router.put(':reference', updatePosteDeCharge);

// TODO: Voir comment on peut filtrer
router.delete(':reference', deletePosteDeCharge);

export default router;
