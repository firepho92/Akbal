'use strict'

var DB = require('../config/configDB.js');
var db = new DB();
var connection = db.getConnection();

module.exports = class Empleados {
  constructor(nombre, telefono, cargo) {
    this.nombre = nombre;
    this.telefono = telefono;
    this.cargo = cargo;
  }
  
  async createEmpleado() {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO Empleados SET ?', {nombre: this.nombre, telefono: this.telefono, cargo: this.cargo}, (error, results, fields) => {
        if(error) throw error;
        resolve(true);
      });
    });
  }

  async readEmpleados() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT id_empleado, nombre, telefono, cargo FROM Empleados', (error, results, fields) => {
        if(error) throw error;
        resolve(results);
      });
    });
  }

  async updateEmpleado(id_empleado) {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE Empleados SET nombre = ?, telefono = ?, cargo = ? WHERE id_empleado = ?', [this.nombre, this.telefono, this.cargo, id_empleado], (error, results, fields) => {
        if(error) throw error;
        resolve(true);
      });
    });
  }
}