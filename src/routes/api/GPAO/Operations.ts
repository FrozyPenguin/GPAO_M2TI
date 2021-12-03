import { Router } from 'express';
import {
  addOperation,
  deleteOperation,
  getOperation,
  getOperations,
  updateOperation,
} from '../../../controllers/OperationsCtrl';

const router = Router();

// Test: 'curl http://localhost:3000/api/GPAO/Operations'
router.get('/', getOperations);

// Test: 'curl http://localhost:3000/api/GPAO/Operations/CD100'
// TODO: Voir comment on peut filtrer
router.get(':reference', getOperation);

// Test: 'curl http://localhost:3000/api/GPAO/Operations/add'
router.post('add', addOperation);

// TODO: Voir comment on peut filtrer
router.put(':reference', updateOperation);

// TODO: Voir comment on peut filtrer
router.delete(':reference', deleteOperation);

export default router;
