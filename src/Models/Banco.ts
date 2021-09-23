import { Cliente } from "./Cliente";

export class Banco {  

  constructor(
          private _id: number = null,
          private _nome: string,
          private _cnpj: string,
          private _agencia: number,
          private clientes: Cliente[] = []
          ) {}

  public get id(): number {
    return this._id;
  }

  public set id(value: number) {
    this._id = value;
  }       

  public getClientes() {
    return this.clientes;
  }

  public adicionaCliente(cliente: Cliente): void{
    this.clientes.push(cliente);
  }

  public getCliente(rg: string): Cliente {
    let findCliente: Cliente;      
    this.clientes.forEach(element => {
        if(element.rg === rg ) {
          findCliente = element;
        }
    });
    return findCliente;
  }

  public get agencia(): number {
    return this._agencia;
  }

  public set agencia(value: number) {
    this._agencia = value;
  }
  
}