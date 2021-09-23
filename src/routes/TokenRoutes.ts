import express from 'express';
import tokenController from "../controller/TokenController";

const router = express.Router();

router.post('/login', tokenController.login);

export default router;