import { Request, Response } from "express";

import contaService from '../services/ServiceConta';
import { Conta } from "../Models/Conta";
class ContaController {
  async findAll(req: Request, res: Response) {
    try {      
      const contas = await contaService.findAll();
      return res.status(200).json(contas)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }      
  }

  async create(req: Request, res: Response): Promise<any> {
    try {
      const newConta = req.body;            
      const createConta = new Conta(newConta);      
      const response = await contaService.createConta(createConta);      
      return res.status(201).json({ response });
    } catch (error) {
      res.status(500).json({ msg: error })
    }
  }

  async update(req: Request, res: Response): Promise<any> {
    try {
      const data = req.body;     
      const { id } = req.params;
      const response = await contaService.updateConta(data, id);
      
      return res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async delete(req: Request, res: Response) {
      const { id } = req.params;  
      const response = await contaService.deleteConta(id);
      if (response === 404) {
         res.status(404).json( { msg: `A Conta com Id:${id} não foi encontrada`});
      }
      if (response === 200 )  {
         console.log(response);          
         res.status(200).json({ msg: 'Conta deletada com sucesso!' });
      }           
  } 

  async deposita(req: Request, res: Response) {
      try {
        const { id } = req.params;
        const valor = req.body.valor;
        if (valor > 500) {
          return res.status(400).json({ msg: 'Valor acima do permitido! Limite: R$500,00' })
        }        
        const response = await contaService.deposita(id, valor);
        res.status(200).json({ response })
      } catch (error) {
        res.status(500).json({ msg: error.message });
      }
  }

  async saque(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const valor = req.body.valor;
      if (valor > 500) {
        return res.status(400).json({ msg: 'Valor acima do permitido! Limite: R$500,00' })
      }        
      const response = await contaService.saque(id, valor);
      res.status(200).json({ response })
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }

  async tranferencia(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { idDestino } = req.body;   
        const { valor } = req.body;           
        
        
        const response = await contaService.transferencia(id, idDestino, valor);
        res.status(200).json({ msg: response }); 
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
  
}

export default new ContaController();
