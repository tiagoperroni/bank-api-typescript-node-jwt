import express from 'express';
import ClienteController from '../controller/ClienteController';

import { auth } from '../middleware/loginRequired';

const router = express.Router();

router.get('/cliente', ClienteController.findAll);
router.post('/cliente', ClienteController.create);
router.put('/cliente/:id', ClienteController.update);
router.delete('/cliente/:id', auth, ClienteController.delete);
//router.use(auth);
export default router;