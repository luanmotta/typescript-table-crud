import { Negociacao } from './Negociacao';
import { logarTempoDeExecucao } from '../helpers/decorators/index'

export class Negociacoes {
  private _negociacoes: Negociacao[] = [];

  adiciona(negociacao: Negociacao): void {
    this._negociacoes.push(negociacao);
  }

  @logarTempoDeExecucao()
  paraArray(): Negociacao[] {
    return [...this._negociacoes];
  }

  paraTexto(): void {
    console.log(JSON.stringify(this._negociacoes));
  }

}
