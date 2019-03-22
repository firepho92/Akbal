'use strict';

let Categoria = require('../../models/categoria');


module.exports = function (router) {

    router.get('/', async (req, res) => {
        let categoria = new Categoria();
        categoria = await categoria.readCategorias();
        res.send(categoria);
    });

};
