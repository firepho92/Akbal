'use strict';

let Empleado = require('../../models/empleado');

module.exports = (router) => {

  router.get('/', async (req, res) => {
    let empleado = new Empleado();
    empleado = await empleado.readEmpleados();
    res.send(empleado);
  });

  router.post('/', async (req, res) => {
  	let empleado = new Empleado(req.body.nombre, req.body.telefono, req.body.cargo);
  	empleado = await empleado.createEmpleado();
  	res.send(empleado);
  });

  router.put('/', async (req, res) => {
  	let empleado = new Empleado(req.body.nombre, req.body.telefono, req.body.cargo);
  	empleado = await empleado.updateEmpleado(req.body.id_empleado);
  	res.send(empleado);
  });
  
};
