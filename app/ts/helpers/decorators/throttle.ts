export function throttle(ms = 500) {
  return function(_: any, __: string, descriptor: PropertyDescriptor) {
    const metodoOriginal = descriptor.value;
    let timer = 0;
    descriptor.value = function(...args: any[]) {
      if (event) event.preventDefault();
      clearInterval(timer);
      timer = setTimeout(() => {
        metodoOriginal.apply(this, args);
      }, ms)
    }

    return descriptor;
  }
}
