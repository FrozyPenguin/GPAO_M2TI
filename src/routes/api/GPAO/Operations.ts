import { Router } from 'express';
import { deleteOperation } from '../../../controllers/Operation/DeleteCtrl';
import {
  getOperations,
  getOperationByRef,
  getOperationByOp,
  getOperationByComposite,
} from '../../../controllers/Operation/GetCtrl';
import { addOperation } from '../../../controllers/Operation/PostCtrl';
import { updateOperation } from '../../../controllers/Operation/PutCtrl';

const router = Router();

// Test: 'curl http://localhost:3000/api/GPAO/Operations'
router.get('/', getOperations);

// Test: 'curl http://localhost:3000/api/GPAO/Operations/CD100'
router.get('/reference/:reference', getOperationByRef);

router.get('/operation/:operation', getOperationByOp);

router.get(
  '/reference/:reference/operation/:operation',
  getOperationByComposite
);

// Test: 'curl http://localhost:3000/api/GPAO/Operations/add'
router.post('/add', addOperation);

router.put('/reference/:reference/operation/:operation', updateOperation);

router.delete('/reference/:reference/operation/:operation', deleteOperation);

export default router;
