import { Request, Response } from "express";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

let request = (url, method, data) => {
  return axios({ url, method, data });
};

class BancoController {
  async findAll(req: Request, res: Response) {
    try {
      const response = await request("http://localhost:3004/banco", "get", null );
      return res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const data: { id; nome; cnpj; agencia; } = req.body;
      data.id = uuidv4();    
      const response = await request("http://localhost:3004/banco", "post", data); 
      return res.status(201).json(response.data);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const data: { nome; cpf; rg; endereco; conta: { numConta; saldo; limite; tipo; senha;} } = req.body;
      const { id } = req.params;
      const response = await request(`http://localhost:3004/banco/${id}`, "put", data );
      return res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const response = await request(
        `http://localhost:3004/banco/${id}`, "delete", null);
      return res.status(204).json();
    } catch (error) { }
  }
}

export default new BancoController();
