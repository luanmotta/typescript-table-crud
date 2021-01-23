import { Negociacao } from '../models/index';

export function imprime(...negociacoes: Negociacao[]): void {
  negociacoes.forEach(negociacao => negociacao.paraTexto())
}
