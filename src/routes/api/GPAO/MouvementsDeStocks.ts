import { Router } from 'express';
import {
  addMouvementsDeStock,
  deleteMouvementsDeStock,
  getMouvementsDeStock,
  getMouvementsDeStocks,
  updateMouvementsDeStock,
} from '../../../controllers/MouvementsDeStocksCtrl';

const router = Router();

// Test: 'curl http://localhost:3000/api/GPAO/MouvementsDeStocks'
router.get('/', getMouvementsDeStocks);

// Test: 'curl http://localhost:3000/api/GPAO/MouvementsDeStocks/CD100'
// TODO: Voir comment on peut filtrer
router.get('/:reference', getMouvementsDeStock);

// Test: 'curl http://localhost:3000/api/GPAO/MouvementsDeStocks/add'
router.post('/add', addMouvementsDeStock);

// TODO: Voir comment on peut filtrer
router.put('/:reference', updateMouvementsDeStock);

// TODO: Voir comment on peut filtrer
router.delete('/:reference', deleteMouvementsDeStock);

export default router;
