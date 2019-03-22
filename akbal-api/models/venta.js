'use strict'

var DB = require('../config/configDB.js');
var db = new DB();
var connection = db.getConnection();

module.exports = class Ventas {
  constructor(ticket, producto, empleado, fecha, caja) {
    this.ticket = ticket;
    this.producto = producto;
    this.empleado = empleado;
    this.fecha = fecha;
    this.caja = caja
  }
  
  async createVenta() {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO Ventas SET ?', {ticket: this.ticket, producto: this.producto, empleado: this.empleado, fecha: this.fecha, caja: this.caja}, (error, results, fields) => {
        if(error) throw error;
        resolve(results);
      });
    });
  } 

  async readVentas() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT id_venta, ticket, producto, empleado, fecha, caja FROM Ventas', (error, results, fields) => {
        if(error) throw error;
        resolve(results);
      });
    });
  }

}