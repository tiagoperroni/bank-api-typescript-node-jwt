import express from 'express';
import userController from '../controller/UserController';

import { auth } from '../middleware/loginRequired';

const router = express.Router();

router.get('/user', auth, userController.getUsers);
router.post('/user', userController.create);


export default router;