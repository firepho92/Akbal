import axios from 'axios';
import serverAddress from '../config/server';

export default class Empleado {
	constructor(nombre, telefono, cargo) {
		this.nombre = nombre;
		this.telefono = telefono;
		this.cargo = cargo;
	}

	async readEmpleados() {
		var request = axios.get(serverAddress + '/empleados')
		return request
			.then(response => {
				return response.data;
			})
			.catch(error => {
				console.log(error);
			});
	}
}