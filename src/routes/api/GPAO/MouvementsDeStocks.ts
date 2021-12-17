import { Router } from 'express';
import { deleteMouvementsDeStock } from '../../../controllers/MouvementDeStock/DeleteCtrl';
import {
  getMouvementsDeStocks,
  getMouvementsDeStocksByRef,
  getMouvementsDeStocksByPeriod,
  getMouvementsDeStockByComposite,
} from '../../../controllers/MouvementDeStock/GetCtrl';
import { addMouvementsDeStock } from '../../../controllers/MouvementDeStock/PostCtrl';
import { updateMouvementsDeStock } from '../../../controllers/MouvementDeStock/PutCtrl';

const router = Router();

// Test: 'curl http://localhost:3000/api/GPAO/MouvementsDeStocks'
router.get('/', getMouvementsDeStocks);

router.get('/reference/:reference', getMouvementsDeStocksByRef);

router.get('/periode/:periode', getMouvementsDeStocksByPeriod);

router.get(
  '/reference/:reference/periode/:periode',
  getMouvementsDeStockByComposite
);

// Test: 'curl http://localhost:3000/api/GPAO/MouvementsDeStocks/add'
router.post('/add', addMouvementsDeStock);

router.put('/reference/:reference/periode/:periode', updateMouvementsDeStock);

router.delete(
  '/reference/:reference/periode/:periode',
  deleteMouvementsDeStock
);

export default router;
