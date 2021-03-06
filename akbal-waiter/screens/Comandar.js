import React from 'react';
import { Animated, BackHandler, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Divider, List, Searchbar, TouchableRipple} from 'react-native-paper';
import Fuse from 'fuse.js';

import Theme from '../Theme';

import Modal from './Modal';
import Carrito from './Carrito';

import AppContext from '../context/AppContext';

export default class Comandar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      notificar: false,
      modal: false,
      producto: null,
      cantidad: 0,
      pedido: []
    }
    this.opciones = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        "producto"
      ]
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  alertar = () => {
    let self = this;
    this.setState({
      notificar: !this.state.notificar
    });
    setTimeout(function() {
      self.setState({
        notificar: !self.state.notificar
      });
    }, 2500);
  }

  insertarPedido = (pedido) => {
    this.setState({
      pedido: [...this.state.pedido, pedido]
    });
    this.alertar();
  }

  handleBackPress = () => {
    this.props.setVista(1);
    return true;
  }

  agregarProducto = (producto) => {
    this.setState({
      producto
    })
    this.modal();
  }

  modal = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  handleQuery = (query) => {
    if(query.length === 0) {
      return this.props.productos;
    } else {
      let fuse = new Fuse(this.props.productos, this.opciones);
      let result = fuse.search(query);
      return result;
    }
  }

  render() {
    return (
      <View style={{height: Dimensions.get('window').height - 90}}>
        {this.state.modal ? <Modal modal={this.modal} elemento={this.state.producto} mesa={this.props.mesa} insertarPedido={this.insertarPedido}/> : null}
        <View style={styles.container}>
          <Text onPress={() => this.alertar()} style={{fontSize: 20, textAlign: 'center', marginBottom: 5}}>{'Mesa: ' + this.props.mesa.nombre}</Text>
          <Searchbar
            style={{marginRight: 10, marginLeft: 10, marginBottom: 5}}
            placeholder="Buscar"
            onChangeText={query => { this.setState({query}) }}
            value={this.state.query}
          />
        </View>
        <View style={[styles.container, {maxHeight: 390}]}>
          <ScrollView>
            {this.handleQuery(this.state.query).map((elemento, index) => (
              <Producto key={index} agregarProducto={this.agregarProducto} elemento={elemento} index={index} modal={this.modal}/>
            ))}
          </ScrollView>
        </View>
        <Carrito mesa={this.props.mesa} pedido={this.state.pedido} notificar={this.state.notificar}/>
      </View>
    );
  }
}

class Producto extends React.Component {
  constructor() {
    super();
    this.fade = new Animated.Value(0);
  }

  componentDidMount() {
    this.fadeIn(this.props.index);
  }

  fadeIn = (index) => {
    this.fade.setValue(0);
     Animated.timing(
       this.fade,
       {
         toValue: 1,
         duration: 250,
         delay: (index + 1) * 100
       }
     ).start(); 
  }

  render() {
    return (
      <Animated.View style={{opacity: this.fade}}>
        <TouchableRipple onPress={() => this.props.agregarProducto(this.props.elemento)}>
          <List.Item title={this.props.elemento.producto} description={this.props.elemento.categoria}/>
        </TouchableRipple>
      </Animated.View>
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

/* lista opcional 
  <List.Accordion
              theme={Theme}
              title="Barra"
              left={props => <List.Icon {...props} icon="local-bar" />}
              expanded={this.state.barra}
              onPress={this.toggleBarra}
            >
              {this.handleQuery(this.state.query).filter(producto => producto.categoria === 1).map((elemento, index) => (
                <Producto key={index} agregarProducto={this.agregarProducto} elemento={elemento} index={index} modal={this.modal}/>
              ))}
            </List.Accordion>

            <List.Accordion
              theme={Theme}
              title="Cocina"
              left={props => <List.Icon {...props} icon="restaurant-menu" />}
              expanded={this.state.cocina}
              onPress={this.toggleCocina}
            >
              {this.handleQuery(this.state.query).filter(producto => producto.categoria === 2).map((elemento, index) => (
                <Producto key={index} elemento={elemento} index={index} modal={this.modal}/>
              ))}
            </List.Accordion>
*/