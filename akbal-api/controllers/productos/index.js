'use strict';

let Producto = require('../../models/producto');

module.exports = (router) => {

  router.get('/', async (req, res) => {
    let producto = new Producto();
    producto = await producto.readProductos();
    res.send(producto);
  });
  
  router.post('/', async (req, res) => {
    let request = req.body;
  	let producto = new Producto(request.producto, request.stock, request.descripcion, request.precio_produccion, request.precio_venta, request.categoria);
  	producto = await producto.createProducto();
  	res.send(producto);
  });

  router.put('/', async (req, res) => {
    let request = req.body;
    let producto = new Producto(request.producto, request.stock, request.descripcion, request.precio_produccion, request.precio_venta, request.categoria);
    producto = await producto.updateProducto(request.id_producto);
    res.send(producto);
  });
};
