import React, { Component } from 'react'
import {
  Animated,
  Dimensions,
  Easing,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Vibration,
  View,
} from 'react-native';
import { Button, List, TouchableRipple } from 'react-native-paper';
import socketio from 'socket.io-client';

import Theme from '../Theme';

import AppContext from '../context/AppContext';

export default class Carrito extends Component {
  constructor() {
    super();
    this.state = {
      carrito: false
    }
    this.movingAnimation = new Animated.Value(-300);
    this.socket = socketio('http://192.168.100.4:8001', {transports: ['websocket']});
  }

  componentDidMount() {
    this.move(-270, 500);
  }

  componentDidUpdate() {
    if(this.props.notificar)
      this.alert();
  }

  alert = () => {
    let self = this;
    this.move(-240, 500);
    setTimeout(function() {
      self.move(-270, 500)
    }, 2000);
  }

  move = (position, duration) => {
    Animated.timing(
      this.movingAnimation,
      {
        toValue: position,
        duration: duration,
        easing: Easing.out(Easing.cubic)
      }
    ).start(); 
  }

  open = () => {
    this.move(0, 500);
  }

  close = () => {
    this.move(-270, 500);
  }

  toggleCarrito = () => {
    if(this.state.carrito === false){
      this.open();
    } else {
      this.close();
    }
    this.setState({
      carrito: !this.state.carrito
    });
  }

  handleSubmit = (pedido, callback) => {
    this.enviarPedido(pedido);
    let mesa = this.props.mesa;
    mesa.elementos.push(pedido);
    callback(mesa);
  }

  enviarPedido = (pedido) => {
    this.socket.emit('pedido', pedido);
  }

  existeEnMesa = (elemento) => {
    let mesa = this.props.mesa;
    return mesa.elementos.map(elemento => elemento.producto.id_producto).includes(elemento.producto.id_producto);
  }

  render() {
    return (
      <AppContext.Consumer>
        {context => (
          <Animated.View style={[styles.carrito, {bottom: this.movingAnimation}]}>
            <TouchableWithoutFeedback onPress={() => this.toggleCarrito()}>
              <View onPress={() => this.toggleCarrito()} style={{flexDirection: 'row', justifyContent: 'center', height: 25}}>
                <View style={{width: 100, height: 4, backgroundColor: '#fff', borderRadius: 5, marginTop: 10}}>
                </View>
              </View>
            </TouchableWithoutFeedback>
            {this.props.notificar ? <Text style={{color: '#fff', textAlign: 'center', fontSize: 20}}>Agregado</Text> : null}
            <View style={{justifyContent: 'space-between', height: 270}}>
              <ScrollView style={{marginTop: 6}}>
                {this.props.pedido.map((elemento, i) => (
                  <Item  key={i} elemento={elemento}/>
                ))}
              </ScrollView>
              <Button style={{marginTop: 5}} theme={Theme} mode="contained" onPress={() => this.handleSubmit(this.props.pedido, context.actualizarMesa)}>Comandar</Button>
            </View>
          </Animated.View>
            )}
          </AppContext.Consumer>
    )
  }
}

class Item extends React.Component {
  handlePress = () => {
    Vibration.vibrate(50);
  }

  render() {
    return (
      <TouchableRipple style={{backgroundColor: '#292951', borderRadius: 5, marginBottom: 5}}>
        <List.Item titleStyle={{color: '#fff'}} descriptionStyle={{color: '#dedede'}} title={this.props.elemento.cantidad + ' ' + this.props.elemento.producto.producto} description={this.props.elemento.nota} right={props => <TouchableRipple onPress={() => this.handlePress()}><List.Icon {...props} color="#F73929" icon="remove-shopping-cart" /></TouchableRipple>}/>
      </TouchableRipple>
    );
  }
}

const styles = StyleSheet.create({
  carrito: {
    paddingRight: 5,
    paddingLeft: 5,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    left: -5,
    position: 'absolute',
    backgroundColor: '#212139',
    height: 300,
    width: Dimensions.get('window').width - 10
  }
});
