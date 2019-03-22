'use strict'

var DB = require('../config/configDB.js');
var db = new DB();
var connection = db.getConnection();

module.exports = class Gasto {
  constructor(monto, descripcion, fecha) {
    this.monto = monto;
    this.descripcion = descripcion;
    this.fecha = fecha;
  }
  
  async createGasto() {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO Gastos SET ?', {monto: this.monto, descripcion: this.descripcion, cargo: this.cargo}, (error, results, fields) => {
        if(error) throw error;
        resolve(results);
      });
    });
  } 

  async readGastos() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT id_gasto, monto, descripcion, fecha FROM Gastos', (error, results, fields) => {
        if(error) throw error;
        resolve(results);
      });
    });
  }

}