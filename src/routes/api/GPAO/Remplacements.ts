import { Router } from 'express';
import { deleteRemplacement } from '../../../controllers/Remplacement/DeleteCtrl';
import {
  getRemplacements,
  getRemplacementsByRemplace,
  getRemplacementsByRemplacant,
  getRemplacementsByComposite,
} from '../../../controllers/Remplacement/GetCtrl';
import { addRemplacement } from '../../../controllers/Remplacement/PostCtrl';
import { updateRemplacement } from '../../../controllers/Remplacement/PutCtrl';

const router = Router();

// Test: 'curl http://localhost:3000/api/GPAO/Remplacements'
router.get('/', getRemplacements);

// Test: 'curl http://localhost:3000/api/GPAO/Remplacements/CD100'
router.get('/remplace/:remplace', getRemplacementsByRemplace);

router.get('/remplacant/:remplacant', getRemplacementsByRemplacant);

router.get(
  '/remplace/:remplace/remplacant/:remplacant',
  getRemplacementsByComposite
);

// Test: 'curl http://localhost:3000/api/GPAO/Remplacements/add'
router.post('/add', addRemplacement);

router.put('/remplace/:remplace/remplacant/:remplacant', updateRemplacement);

router.delete('/remplace/:remplace/remplacant/:remplacant', deleteRemplacement);

export default router;
