import { NegociacoesView, MensagemView } from '../views/index';
import { Negociacao, Negociacoes } from '../models/index';
import { domInject, throttle } from '../helpers/decorators/index'
import { NegociacaoService } from '../services/index';
import { imprime } from '../helpers/index';
export class NegociacaoController {

  @domInject('#data')
  private _inputData!: JQuery;

  @domInject('#quantidade')
  private _inputQuantidade!: JQuery;

  @domInject('#valor')
  private _inputValor!: JQuery;

  private _negociacoes = new Negociacoes();
  private _negociacoesView = new NegociacoesView('#negociacoesView');
  private _mensagemView = new MensagemView('#mensagemView');

  private _service = new NegociacaoService();

  constructor() {
    this._negociacoesView.update(this._negociacoes)
  }

  @throttle()
  adiciona(): void {
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
    this._negociacoesView.update(this._negociacoes);
    this._mensagemView.update('Negociação adicionada com sucesso');

    imprime(negociacao, this._negociacoes)

  }

  private _ehDiaUtil(data: Date) {
    return data.getDay() !== DiaDaSemana.Sabado && data.getDay() !== DiaDaSemana.Domingo
  }

  @throttle()
  async importaDados() {
    const negociacoesParaImportar = await this._service
      .obterNegociacoes(res => {
        if (res.ok) {
          return res;
        } else {
          throw new Error(res.statusText);
        }
      })
      const negociacoesJaImportadas = this._negociacoes.paraArray();

      negociacoesParaImportar.filter(negociacao => {
        return !negociacoesJaImportadas.some(jaImportada => {
          return negociacao.ehIgual(jaImportada);
        })
      }).forEach(negociacao => {
        this._negociacoes.adiciona(negociacao);
        this._negociacoesView.update(this._negociacoes);
      })
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
