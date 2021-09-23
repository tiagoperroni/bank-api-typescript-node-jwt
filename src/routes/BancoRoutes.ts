import express from 'express';
import bancoController from '../controller/BancoController';

import { auth } from '../middleware/loginRequired';

const router = express.Router();

router.get('/banco', auth, bancoController.findAll);
router.post('/banco', bancoController.create);
router.put('/banco/:id', bancoController.update);
router.delete('/banco/:id', auth, bancoController.delete);
//router.use(auth);
export default router;