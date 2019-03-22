'use strict';

let Venta = require('../../models/venta');

module.exports = (router) => {

  router.get('/', async (req, res) => {
    let venta = new Venta();
    venta = await venta.readVentas();
    res.send(venta);
  });

  router.post('/', async (req, res) => {
    let request = req.body;
  	let venta = new Venta(request.ticket, request.producto, request.empleado, request.fecha, request.caja);
  	venta = await venta.createVenta();
  	res.send(venta);
  });

};
