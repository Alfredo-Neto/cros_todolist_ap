import { Router, Request, Response, NextFunction } from 'express';
import { create } from '../controllers/UserController';

const router = Router();

router.post('/', create);

export default router;
