'use strict'

var DB = require('../config/configDB.js');
var db = new DB();
var connection = db.getConnection();

module.exports = class Productos {
  constructor(producto, stock, descripcion, precio_produccion, precio_venta, categoria) {
    this.producto = producto;
    this.stock = stock;
    this.descripcion = descripcion;
    this.precio_produccion = precio_produccion;
    this.precio_venta = precio_venta;
    this.categoria = categoria;
  }
  
  async createProducto() {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO Productos SET ?', {producto: this.producto, stock: this.stock, descripcion: this.descripcion, precio_produccion: this.precio_produccion, precio_venta: this.precio_venta, categoria: this.categoria}, (error, results, fields) => {
        if(error) throw error;
        resolve(true);
      });
    });
  }

  async readProductos() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT id_producto, producto, stock, descripcion, precio_produccion, precio_venta, categoria FROM Productos', (error, results, fields) => {
        if(error) throw error;
        resolve(results);
      });
    });
  }

  async updateProducto(id_producto) {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE  Productos SET producto = ?, stock = ?, descripcion = ?, precio_produccion = ?, precio_venta = ?, categoria = ? WHERE id_producto = ?', [this.usuario, this.password, id_producto], (error, results, fields) => {
        if(error) throw error;
        resolve(true);
      });
    });
  }
}