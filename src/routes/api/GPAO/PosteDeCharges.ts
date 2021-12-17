import { Router } from 'express';
import { deletePosteDeCharge } from '../../../controllers/PosteDeCharge/DeleteCtrl';
import {
  getPosteDeCharges,
  getPosteDeCharge,
} from '../../../controllers/PosteDeCharge/GetCtrl';
import { addPosteDeCharge } from '../../../controllers/PosteDeCharge/PostCtrl';
import { updatePosteDeCharge } from '../../../controllers/PosteDeCharge/PutCtrl';

const router = Router();

// Test: 'curl http://localhost:3000/api/GPAO/PosteDeCharges'
router.get('/', getPosteDeCharges);

// Test: 'curl http://localhost:3000/api/GPAO/PosteDeCharges/CD100'
// TODO: Voir comment on peut filtrer
router.get('/:reference', getPosteDeCharge);

// Test: 'curl http://localhost:3000/api/GPAO/PosteDeCharges/add'
router.post('/add', addPosteDeCharge);

// TODO: Voir comment on peut filtrer
router.put('/:reference', updatePosteDeCharge);

// TODO: Voir comment on peut filtrer
router.delete('/:reference', deletePosteDeCharge);

export default router;
