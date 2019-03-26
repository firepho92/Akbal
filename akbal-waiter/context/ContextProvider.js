import React, {Component} from 'react';

import AppContext from './AppContext';

import Empleado from '../models/Empleado';
import Producto from '../models/Producto';

import colores from './data';


class ContextProvider extends Component {
  constructor() {
    super();
    this.state = {
      colores: [],
      empleados: [],
      personalSeleccionado: [],
      mesas: [],
      productos: [],
      alerta: {
        visible: true,
        mensaje: ''
      }
    }
  }

  async componentDidMount() {
    let empleado = new Empleado();
    let producto = new Producto();
    let empleados = await empleado.readEmpleados();
    let productos = await producto.readProductos();
    this.setState({
      colores,
      empleados,
      productos
    });
  }

  actualizarMesa = (nuevaMesa) => {
    let mesas = this.state.mesas;
    mesas = mesas.map(mesa => {
      if(mesa.nombre === nuevaMesa.nombre)
        return nuevaMesa;
      return mesa;
    });
    this.setState({
      mesas
    });
  }

  agregarMesa = (nombre, mesero) => {
    let mesas = this.state.mesas;
    let mesa = {
      nombre: nombre,
      mesero: mesero,
      elementos: []
    }
    mesas = [...mesas, mesa];
    this.setState({
      mesas
    });
  }

  handleToggle = (empleado) => {
    if(this.estaSeleccionado(empleado)) {
      if(this.tieneMesas(empleado.id_empleado)) {
        return false;
      }
      let personalSeleccionado = this.state.personalSeleccionado.filter(personal => personal.id_empleado !== empleado.id_empleado);
      this.setState({
        personalSeleccionado
      });
    } else {
      let personalSeleccionado = [...this.state.personalSeleccionado, empleado];
      this.setState({
        personalSeleccionado
      });
    }
    return true;
  }

  tieneMesas = (id_empleado) => {
    return this.state.mesas.map(mesa => mesa.mesero.id_empleado).includes(id_empleado);
  }

  estaSeleccionado = (empleado) => {
    return this.state.personalSeleccionado.map(seleccionado => seleccionado.id_empleado).includes(empleado.id_empleado);
  }

  mostrarAlerta = (mensaje) => {
    this.setState({
      alert: {
        visible: true,
        mensaje: mensaje
      }
    });
  }

  ocultarAlert = () => {
    this.setState({
      alert: {
        visible: false,
        mensaje: ''
      }
    });
  }

  render() {
    return (
      <AppContext.Provider value={{
        state: this.state,
        agregarMesa: this.agregarMesa,
        actualizarMesa: this.actualizarMesa,
        handleToggle: this.handleToggle,
        estaSeleccionado: this.estaSeleccionado,
        mostrarAlerta: this.mostrarAlerta,
        ocultarAlerta: this.ocultarAlerta
      }}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default ContextProvider;