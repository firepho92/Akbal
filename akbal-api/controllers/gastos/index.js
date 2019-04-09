'use strict';

let Gasto = require('../../models/gasto');

module.exports = (router) => {

  router.get('/', async (req, res) => {
    let gasto = new Gasto();
    gasto = await gasto.readGastos();
    res.send(gasto);
  });
  
  router.post('/', async (req, res) => {
  	let gasto = new Gasto(req.body.monto, req.body.descripcion, req.body.fecha);
  	gasto = await gasto.createGasto();
  	res.send(gasto);
  });
};
