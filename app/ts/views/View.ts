export abstract class View<T> {
  protected _elemento: JQuery;

  constructor(selector: string) {
    this._elemento = <JQuery>$(selector);
  }

  update(model: T): void {
    this._elemento.html(this.template(model));
  }

  abstract template(model: T): string;
}
