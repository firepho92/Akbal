'use strict';

let Caja = require('../../models/caja');

module.exports = (router) => {

  router.get('/', async (req, res) => {
    let caja = new Caja();
    caja = await caja.readCaja();
    res.send(caja);
  });
  
  router.post('/', async (req, res) => {
  	let caja = new Caja(req.body.fecha, req.body.monto);
  	caja = await caja.createCaja();
  	res.send(caja);
  });
};
