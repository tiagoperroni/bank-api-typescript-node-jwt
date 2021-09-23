import { Request, Response } from "express";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import bcrypt from 'bcrypt';

let request = (url, method, data) => {
  return axios({ url, method, data });
};

class CLienteController {
  async findAll(req: Request, res: Response) {
    try {
      const response = await request("http://localhost:3004/cliente", "get", null );
      return res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async create(req: Request, res: Response) {
    try { 
      const data: { id; nome; cpf; rg; endereco; conta: { id; numConta; saldo; limite; tipo; senha; banco: { id }} } = req.body;
      const id = data.conta.banco.id;
      const responseBanco = await request(`http://localhost:3004/banco/${id}`, "get", null );
      data.conta.banco = responseBanco.data;
      console.log(responseBanco);
      data.id = uuidv4();
      const password = data.conta.senha;                 
      const hash = await bcrypt.hash(password, 6);
      data.conta.senha = hash;
      const response = await request("http://localhost:3004/cliente", "post", data); 
      return res.status(201).json(response.data);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const data: { nome; cpf; rg; endereco; conta: { numConta; saldo; limite; tipo; senha;} } = req.body;
      const { id } = req.params;
      const response = await request(`http://localhost:3004/cliente/${id}`, "put", data );
      return res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const response = await request(
        `http://localhost:3004/cliente/${id}`, "delete", null);
      return res.status(204).json();
    } catch (error) { }
  }
}

export default new CLienteController();
