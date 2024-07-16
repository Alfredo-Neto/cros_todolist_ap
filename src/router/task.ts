import { Router } from 'express';
import { create, list, update, remove, updateStatus, filterByStatus, createSubtask, listSubtasks } from '../controllers/TaskController';
import { verifyToken } from '../auth/auth';

const router = Router();

router.post('/', verifyToken, create);
router.get('/', verifyToken, list);
router.put('/:id', verifyToken, update);
router.delete('/:id', verifyToken, remove);
router.patch('/:id/status', verifyToken, updateStatus);
router.get('/status', verifyToken, filterByStatus);
router.post('/subtasks', verifyToken, createSubtask);
router.get('/subtasks', verifyToken, listSubtasks);

export default router;
