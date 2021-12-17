import { Router } from 'express';
import { addArticle } from '../../../controllers/Article/PostCtrl';
import { getArticle, getArticles } from '../../../controllers/Article/GetCtrl';
import { deleteArticle } from '../../../controllers/Article/DeleteCtrl';
import { updateArticle } from '../../../controllers/Article/PutCtrl';

const router = Router();

// Test: 'curl http://localhost:3000/api/GPAO/Articles'
router.get('/', getArticles);

// Test: 'curl http://localhost:3000/api/GPAO/Articles/CD100'
router.get('/:reference', getArticle);

// Test: 'curl http://localhost:3000/api/GPAO/Articles/add'
router.post('/add', addArticle);

router.put('/:reference', updateArticle);

router.delete('/:reference', deleteArticle);

export default router;
