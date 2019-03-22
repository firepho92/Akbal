'use strict'

var DB = require('../config/configDB.js');
var db = new DB();
var connection = db.getConnection();

module.exports = class Administrador {
  constructor(usuario, password) {
    this.usuario = usuario,
    this.password = password
  }
    
  async createAdministrador() {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO Administradores SET ?', {usuario: this.usuario, password: this.password}, (error, results, fields) => {
        if(error) throw error;
        resolve(true);
      });
    });
  }
  
  async readAdministrador() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT administrador_id, usuario, password FROM Administradores', (error, results, fields) => {
        if(error) throw error;
        resolve(results);
      });
    });
  }
  
  async updateAdministrador() {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE  Administradores SET usuario = ?, password = ? WHERE id_administrador = ?', [this.usuario, this.password, this.id_administrador], (error, results, fields) => {
        if(error) throw error;
        resolve(true);
      });
    });
  }
}
