'use strict';

let Cargo = require('../../models/cargo');

module.exports = (router) => {

  router.get('/', async (req, res) => {
    let cargo = new Cargo();
    cargo = await cargo.readCargos();
    res.send(cargo);
  });
  
};
