import express from 'express';
import ContaController from '../controller/ContaController';

import { auth } from '../middleware/loginRequired';

const router = express.Router();

router.get('/conta', auth, ContaController.findAll);
router.post('/conta', auth, ContaController.create);
router.put('/conta/:id', auth, ContaController.update);
router.delete('/conta/:id', auth, ContaController.delete);
router.put('/conta/deposito/:id', auth, ContaController.deposita);
router.put('/conta/saque/:id', auth, ContaController.saque);
router.put('/conta/transferencia/:id', auth, ContaController.tranferencia);

export default router;