import { NegociacoesView, MensagemView } from '../views/index';
import { Negociacao, Negociacoes } from '../models/index';
import { domInject } from '../helpers/decorators/index'
export class NegociacaoController {

  @domInject('#data')
  private _inputData: JQuery;

  @domInject('#quantidade')
  private _inputQuantidade: JQuery;

  @domInject('#valor')
  private _inputValor: JQuery;

  private _negociacoes = new Negociacoes();
  private _negociacoesView = new NegociacoesView('#negociacoesView');
  private _mensagemView = new MensagemView('#mensagemView');

  constructor() {
    this._negociacoesView.update(this._negociacoes)
  }

  adiciona(event: JQuery.Event): void {
    event.preventDefault();
    const _inputData = <string>this._inputData.val();
    const _inputQuantidade = <string>this._inputQuantidade.val();
    const _inputValor = <string>this._inputValor.val();

    const data = new Date(_inputData.replace(/-/g, ','))

    if (!this._ehDiaUtil(data)) {
      this._mensagemView.update('Somente negociações em dias úteis, por favor.')
      return
    }

    const negociacao = new Negociacao(
      data,
      parseInt(_inputQuantidade),
      parseFloat(_inputValor)
    );
    this._negociacoes.adiciona(negociacao);
    this._negociacoes.paraArray().forEach((negociacao) => {
      console.log(negociacao.data);
      console.log(negociacao.quantidade);
      console.log(negociacao.valor);
    })
    this._negociacoesView.update(this._negociacoes);
    this._mensagemView.update('Negociação adicionada com sucesso');
  }

  private _ehDiaUtil(data: Date) {
    return data.getDay() !== DiaDaSemana.Sabado && data.getDay() !== DiaDaSemana.Domingo
  }

}

enum DiaDaSemana {
  Domingo,
  Segunda,
  Terca,
  Quarta,
  Quinta,
  Sexta,
  Sabado,
}
