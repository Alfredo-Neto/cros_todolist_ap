import { Router } from 'express';
import { create, list, update, remove, updateStatus, filterByStatus } from '../controllers/TaskController';
import { authenticate } from '../auth/auth';

const router = Router();

router.post('/', authenticate, create);
router.get('/', authenticate, list);
router.put('/:id', authenticate, update);
router.delete('/:id', authenticate, remove);
router.patch('/:id/status', authenticate, updateStatus);
router.get('/status', authenticate, filterByStatus);

export default router;
