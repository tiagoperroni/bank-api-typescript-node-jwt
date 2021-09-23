import { Banco } from "./Banco";              

export class Conta {  

  private id: string = null             
  private _numConta: number
  private _saldo: number
  private _limite: number 
  private _tipo: number 
  private _senha: string
  private _banco: Banco

  constructor(conta: Conta) {
    this.id = conta.id;
    this._saldo = conta.saldo;
    this._limite = conta.limite;
    this._tipo = conta.tipo;
    this._senha = conta.senha;
    this._banco = conta.banco;
  }

  public get idConta(): string {
    return this.id;
  }

  public set idConta(value: string) {
    this.id = value;
  } 

  public get numConta(): number {
    return this._numConta;
  }

  public set numConta(value: number) {
    this._numConta = value;
  } 

  public get saldo(): number {
    return this._saldo;
  }

  public set saldo(value: number) {
    this._saldo = value;
  } 

  public get limite(): number {
    return this._limite;
  }

  public set limite(value: number) {
    this._limite = value;
  } 

  public get tipo(): number {
    return this._tipo;
  }

  public set tipo(value: number) {
    this._tipo = value;
  }

  public get senha(): string {
    return this._senha;
  }

  public set senha(value: string) {
    this._senha = value;
  }

  public get banco(): Banco {
    return this._banco;
  }

  public set banco(value: Banco) {
    this._banco = value;
  }


  public depositar(valor: number) {
    this._saldo += valor;
  }

  public sacar(valor: number) {
    this._saldo -= valor;
  }  
}