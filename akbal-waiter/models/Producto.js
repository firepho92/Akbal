import axios from 'axios';
import serverAddress from '../config/server';

export default class Producto {
	constructor(producto, descripcion, precio_produccion, precio_venta, categoria) {
		this.producto = producto;
		this.descripcion = descripcion;
		this.precio_produccion = precio_produccion;
		this.precio_venta = precio_venta;
		this.categoria = categoria;
	}

	async readProductos() {
		var request = axios.get(serverAddress + '/productos')
		return request
			.then(response => {
				return response.data;
			})
			.catch(error => {
				console.log(error);
			});
	}
}