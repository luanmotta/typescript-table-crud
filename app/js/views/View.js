System.register([], function (exports_1, context_1) {
    "use strict";
    var View;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            View = class View {
                constructor(selector) {
                    this._elemento = $(selector);
                }
                update(model) {
                    this._elemento.html(this.template(model));
                }
            };
            exports_1("View", View);
        }
    };
});
