import axios from "axios";
import { Conta } from "../Models/Conta";

let request = (url, method, data) => {
  return axios({ url, method, data });
};

class RequisicoesConta {
  public async getAll(): Promise<Conta[]> {
    const response = await request("http://localhost:3004/conta", "get", null);
    if (response.data < 1) {
      throw new Error("Não foram encontrados registros!");
    }
    return response.data;
  }

  public async createConta(conta: Conta): Promise<Conta> {   
    const id = conta.banco.id;
    const responseBanco = await request(`http://localhost:3004/banco/${id}`, "get", null);
    conta.banco = responseBanco.data;  

    const responseConta = await request("http://localhost:3004/conta", "post", conta );
    if (!responseConta) {
      throw new Error("Preencha todos os campos!");
    }    
    return responseConta.data;
  }

  public async updateConta(conta: Conta, id: string): Promise<Conta> {        
    const response = await request(`http://localhost:3004/conta/${id}`, "get", null );    
    if(!response.data){
      throw new Error('Conta não encontrada!')
    }
    console.log(response.data);
    
    conta.banco = response.data.banco;
    const responseConta = await request(`http://localhost:3004/conta/${id}`, "put", conta );    
    return responseConta.data;
  }

  public async deleteConta(id: string) { 
    try {
      await request(`http://localhost:3004/conta/${id}`, "get", null); 
    } catch (error) {
      if(error.response.status == 404){              
        return  error.response.status;
      }           
    }
   const response = await request(`http://localhost:3004/conta/${id}`, "delete", null );   
   if(response.status == 200) {     
     return response.status;
   }
  }

  public async deposita(id: string, valor: number) {    
    const contaId = await request(`http://localhost:3004/conta/${id}`, "get", null);  
    
    if (contaId.data.saldo  > contaId.data.limite) {
      return `Limite máximo da conta atingido! Limite atual R$${contaId.data.limite},00`
    }
    
    contaId.data.saldo += valor;
    await request(`http://localhost:3004/conta/${id}`, "put", contaId.data );
    
    
    
    return `Depósito no valor de R$${valor} realizado com sucesso!`
  }

  public async saque(id: string, valor: number) {    
    const contaId = await request(`http://localhost:3004/conta/${id}`, "get", null);
    if (contaId.data.saldo < valor ) {
      return `Saldo indisponível! Saldo atual R$${contaId.data.saldo},00`
    }
    
    contaId.data.saldo -= valor;
    await request(`http://localhost:3004/conta/${id}`, "put", contaId.data );    
    
    return `Saque no valor de R$${valor} realizado com sucesso!`
  }

  public async transferencia(id: string, idDestino: string, valor: number,) {   
    const contaId = await request(`http://localhost:3004/conta/${id}`, "get", null);
    contaId.data.saldo -= valor
    await request(`http://localhost:3004/conta/${id}`, "put", contaId.data );
    const contaIdDestino = await request(`http://localhost:3004/conta/${idDestino}`, "get", null);
    contaIdDestino.data.saldo += valor
    await request(`http://localhost:3004/conta/${idDestino}`, "put", contaIdDestino.data );
    return 'Transferência realizada com sucesso!'
  }
}

// const requisisoesConta = new RequisicoesConta();
// requisisoesConta.transferencia("c3c44d89-42d8-4566-932d-5fa52d780a8c", 25, "5c496ac9-774d-4ed3-9ea5-1a53694146f8");

export default new RequisicoesConta();
