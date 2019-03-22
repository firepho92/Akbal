'use strict'

var DB = require('../config/configDB.js');
var db = new DB();
var connection = db.getConnection();

module.exports = class Cargo {
  constructor(cargo) {
    this.cargo = cargo;
  }
  
  async readCargos() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT id_cargo, cargo FROM Cargos', (error, results, fields) => {
        if(error) throw error;
        resolve(results);
      });
    });
  }  
}