import './config/env';
import express, { Request, Response } from 'express';
import cors from 'cors';

import  contaRouter from './routes/ContaRoutes';
import  clienteRouter from './routes/ClienteRoutes';
import  bancoRouter from './routes/BancoRoutes';
import  userRouter from './routes/UserRoutes';
import  tokenRouter from './routes/TokenRoutes';

const PORT: number = +process.env.APP_PORT;
const HOST = process.env.APP_HOST;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use('/', contaRouter); 
app.use('/', clienteRouter); 
app.use('/', bancoRouter); 
app.use('/', userRouter);
app.use('/', tokenRouter);


app.listen(PORT, HOST, () => {
  console.log(`Server starting on http://${HOST}:${PORT}`);  
});