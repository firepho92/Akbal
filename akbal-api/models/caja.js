'use strict'

var DB = require('../config/configDB.js');
var db = new DB();
var connection = db.getConnection();

module.exports = class Caja {
  constructor(fecha, monto) {
    this.fecha = fecha;
    this.monto = monto;
  }
  
  async createCaja() {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO Caja SET ?', {fecha: this.fecha, monto: this.monto}, (error, results, fields) => {
        if(error) throw error;
        resolve(results);
      });
    });
  } 

  async readCaja() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT id_caja, fecha, monto FROM Caja', (error, results, fields) => {
        if(error) throw error;
        resolve(results);
      });
    });
  }

}