class NegociacaoController {
  private _inputData: JQuery;
  private _inputQuantidade: JQuery;
  private _inputValor: JQuery;
  private _negociacoes = new Negociacoes();
  private _negociacoesView = new NegociacoesView('#negociacoesView');
  private _mensagemView = new MensagemView('#mensagemView');

  constructor() {
    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');

    this._negociacoesView.update(this._negociacoes)
  }

  adiciona(event: JQuery.Event): void {
    event.preventDefault();
    const _inputData = <string>this._inputData.val();
    const _inputQuantidade = <string>this._inputQuantidade.val();
    const _inputValor = <string>this._inputValor.val();

    const negociacao = new Negociacao(
      new Date(_inputData.replace(/-/g, ',')),
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

}
