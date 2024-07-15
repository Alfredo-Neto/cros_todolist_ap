import { Router, Request, Response, NextFunction } from 'express';
import { create } from '../controllers/UserController';

const router = Router();

const timeLog = (req: Request, res: Response, next: NextFunction) => {
  console.log('Time: ', Date.now());
  next();
};

router.use(timeLog);

router.post('/', create);

export default router;
