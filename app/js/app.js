"use strict";
const controller = new NegociacaoController();
$('.form').on('submit', controller.adiciona.bind(controller));
