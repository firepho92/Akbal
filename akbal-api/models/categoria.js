'use strict'

var DB = require('../config/configDB.js');
var db = new DB();
var connection = db.getConnection();

module.exports = class Categoria {
  constructor(categoria) {
    this.categoria = categoria;
  }
  
  async readCategorias() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT id_categoria, categoria FROM Categorias', (error, results, fields) => {
        if(error) throw error;
        resolve(results);
      });
    });
  }  
}