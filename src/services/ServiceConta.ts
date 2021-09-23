import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import ContaController from "../controller/ContaController";

import requisicoesConta from "../data/RequisicoesConta";
import { Conta } from "../Models/Conta";

class ServiceConta {
  async findAll(): Promise<Conta[]> {
    const getConta = await requisicoesConta.getAll();
    if (!getConta) {
      throw new Error("Houve um erro!");
    }
    return getConta;
  }

  async createConta(conta: Conta): Promise<Conta> {
    if(conta.banco.id == null) {
      throw new Error("Preencha o id do banco!");       
    } 
    const hash = await bcrypt.hash(conta.senha.toString(), 6);
    conta.senha = hash;
    conta.idConta = uuidv4();      
    return await requisicoesConta.createConta(conta);
  }  

  async updateConta(conta: Conta, id: string): Promise<Conta> {
    const hash = await bcrypt.hash(conta.senha.toString(), 6);
    conta.senha = hash;          
    return await requisicoesConta.updateConta(conta, id);
  } 

  async deleteConta(id: string) {    
     const response = await requisicoesConta.deleteConta(id);     
     return response;
         
  }

  public async deposita(id: string, valor: number) {
    if(!id || ! valor){
      return 'Preencha os dados corretamente!'   
    }    
    const deposito = requisicoesConta.deposita(id, valor);
    return deposito;
  }

  public async saque(id: string, valor: number) {
    if(!id || ! valor){
      return 'Preencha os dados corretamente!'   
    }    
    const saque = requisicoesConta.saque(id, valor);
    return saque;
  }

  public async transferencia(id: string, idDestino: string, valor: number,) {    
    const tranfere = await requisicoesConta.transferencia(id,  idDestino, valor,);
    return tranfere;
  }

}

export default new ServiceConta();
