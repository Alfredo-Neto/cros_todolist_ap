import { Router, Request, Response, NextFunction } from 'express';
import { create } from '../controllers/TaskController';

const router = Router();

router.post('/', create);

export default router;
