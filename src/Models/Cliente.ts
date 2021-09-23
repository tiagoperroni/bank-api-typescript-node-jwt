import { Conta } from "./Conta";

export class Cliente {  

  constructor(
              private id: number = null,
              private _nome: string,
              private _cpf: string,
              private _rg: string,
              private _endereco: string,
              private _conta: Conta
              ) {}

  public get nome(): string {
    return this._nome;
  }

  public set nome(cpf: string) {
    if (cpf != '' || cpf != null) {
      this._cpf = cpf;
    }
  } 

  public get cpf(): string {
    return this._cpf;
  }

  public set cpf(value: string) {
    this._cpf = value;
  } 

  public get rg(): string {
    return this._rg;
  }

  public set rg(value: string) {
    this._rg = value;
  }

  public get endereco(): string {
    return this._endereco;
  }

  public set endereco(value: string) {
    this._endereco = value;
  }

  public get conta(): Conta {
    return this._conta;
  }

  public set conta(value: Conta) {
    this._conta = value;
  }  
}