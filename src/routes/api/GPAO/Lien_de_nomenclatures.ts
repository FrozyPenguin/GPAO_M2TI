import { Router } from 'express';
import {
  addLienDeNomenclature,
  deleteLienDeNomenclature,
  getLienDeNomenclature,
  getLienDeNomenclatures,
  updateLienDeNomenclature,
} from '../../../controllers/Lien_de_nomenclaturesCtrl';

const router = Router();

// Test: 'curl http://localhost:3000/api/GPAO/LienDeNomenclatures'
router.get('/', getLienDeNomenclatures);

// Test: 'curl http://localhost:3000/api/GPAO/LienDeNomenclatures/CD100'
// TODO: Voir comment on peut filtrer
router.get('/:reference', getLienDeNomenclature);

// Test: 'curl http://localhost:3000/api/GPAO/LienDeNomenclatures/add'
router.post('/add', addLienDeNomenclature);

// TODO: Voir comment on peut filtrer
router.put('/:reference', updateLienDeNomenclature);

// TODO: Voir comment on peut filtrer
router.delete('/:reference', deleteLienDeNomenclature);

export default router;
