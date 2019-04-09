import React from 'react';
import { Animated, BackHandler, Dimensions, StyleSheet, Text, View } from 'react-native';
import { Button, Divider, TextInput} from 'react-native-paper';
import socketio from 'socket.io-client';

import Theme from '../Theme';

import AppContext from '../context/AppContext';

export default class Modal extends React.Component {
  constructor() {
    super();
    this.state = {
      cantidad: '',
      nota: ''
    }
    this.socket = socketio('http://192.168.100.4:8001', {transports: ['websocket']});
    this.fade = new Animated.Value(0);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    this.fadeIn();
    this.socket.on('connect', () => {
      console.log('connectado');
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.modal();
    return true;
  }

  fadeIn = () => {
    this.fade.setValue(0);
     Animated.timing(
       this.fade,
       {
         toValue: 1,
         duration: 175,
       }
     ).start(); 
  }

  existeEnMesa = (elemento) => {
    let mesa = this.props.mesa;
    return mesa.elementos.map(elemento => elemento.producto.id_producto).includes(elemento.producto.id_producto);
  }

  enviarPedido = (elemento) => {
    this.socket.emit('pedido', elemento);
  }

  handleSubmit = (/*callback*/) => {
    let producto = this.props.elemento;
    this.props.insertarPedido({producto: producto, cantidad: this.state.cantidad, nota: this.state.nota});
    this.props.modal();
    /*let mesa = this.props.mesa;
    let item = {producto: this.props.elemento, cantidad: this.state.cantidad, nota: this.state.nota};
    this.enviarPedido({...item, mesa: mesa});
    if(this.existeEnMesa(item)){
      mesa.elementos = mesa.elementos.map(elemento => {
        if(elemento.producto.id_producto === item.producto.id_producto) {
          elemento.cantidad += Number.parseInt(this.state.cantidad, 10);
        }
        return elemento;
      });
    } else {
      item.cantidad = Number.parseInt(this.state.cantidad, 10);
      item.nota = this.state.nota;
      mesa.elementos.push(item);
    }
    this.props.modal();
    callback(mesa);*/
  }

  render() {
    return (
      <AppContext.Consumer>
        {context => (
          <Animated.View style={[styles.modalBase, {opacity: this.fade}]} onPress={() =>  this.props.modal()}>
            <View style={styles.modal}>
              <View style={styles.modalTitle}><Text style={{fontSize: 20, textAlign: 'center', paddingBottom: 10}}>{this.props.elemento.producto}</Text></View>
              <Divider/>
              <View style={{paddingTop: 10}}>
                <TextInput
                  keyboardType='numeric'
                  mode='outlined'
                  theme={Theme}
                  label='Cantidad'
                  value={this.state.cantidad}
                  onChangeText={cantidad => this.setState({ cantidad })}
                />
              </View>
              <View style={{paddingTop: 10, paddingBottom: 10}}>
                <TextInput
                  mode='outlined'
                  theme={Theme}
                  label='Nota'
                  value={this.state.nota}
                  onChangeText={nota => this.setState({ nota })}
                />
              </View>
              <Button color="#3f51b5" mode="contained" onPress={() => this.handleSubmit(/*context.actualizarMesa*/)}>Aceptar</Button>
            </View>
          </Animated.View>
        )}
      </AppContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 5,
    marginBottom: 5
  },
  modalBase: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    zIndex: 10,
    top: -90,
    left: -10
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    width: 300
  },
  modalTitle: {
    top: 0
  }
});
