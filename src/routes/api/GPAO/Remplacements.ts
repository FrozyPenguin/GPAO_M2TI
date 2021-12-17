import { Router } from 'express';
import { deleteRemplacement } from '../../../controllers/Remplacement/DeleteCtrl';
import {
  getRemplacements,
  getRemplacement,
} from '../../../controllers/Remplacement/GetCtrl';
import { addRemplacement } from '../../../controllers/Remplacement/PostCtrl';
import { updateRemplacement } from '../../../controllers/Remplacement/PutCtrl';

const router = Router();

// Test: 'curl http://localhost:3000/api/GPAO/Remplacements'
router.get('/', getRemplacements);

// Test: 'curl http://localhost:3000/api/GPAO/Remplacements/CD100'
// TODO: Voir comment on peut filtrer
router.get('/:reference', getRemplacement);

// Test: 'curl http://localhost:3000/api/GPAO/Remplacements/add'
router.post('/add', addRemplacement);

// TODO: Voir comment on peut filtrer
router.put('/:reference', updateRemplacement);

// TODO: Voir comment on peut filtrer
router.delete('/:reference', deleteRemplacement);

export default router;
