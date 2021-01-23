export function logarTempoDeExecucao(emSegundos: boolean = false) {
  return function(_: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const metodoOriginal = descriptor.value;

    descriptor.value = function(...args: any[]) {
      let unidade = 'ms';
      let divisor = 1;
      if (emSegundos) {
        unidade = 's';
        divisor = 1000;
      }
      console.log('--------------');
      console.log(`Os parâmetros passados para o método ${propertyKey}: ${JSON.stringify(args)}`)
      const t1 = performance.now()
      const retorno = metodoOriginal.apply(this, args);
      const t2 = performance.now()

      console.log(`O retorno do método ${propertyKey} é ${JSON.stringify(retorno)}`);
      console.log(`O tempo de execução do método ${propertyKey} foi de ${(t2 - t1) / divisor} ${unidade}.`);
      console.log('--------------')
      return retorno;
    }

    return descriptor;
  }
}