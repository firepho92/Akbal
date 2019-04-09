import React from 'react';
import { Animated, Easing, Picker, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, List, TextInput, TouchableRipple } from 'react-native-paper';

import Mesa from './Mesa';
import Loading from './Loading';
import Comandar from './Comandar';

import Theme from '../Theme';

import AppContext from '../context/AppContext';

export default class Mesas extends React.Component {
  constructor() {
    super();
    this.state = {
      vista: 0,
      mesa: null,
      ready: false
    }
  }

  handleReady = () => {
    this.setState({
      ready: !this.state.ready
    })
  }

  setVista = (vista) => {
    this.setState({
      vista
    });
  }

  setMesa = (vista, mesa) => {
    this.setState({
      mesa
    });
    this.setVista(vista)
  }

  render() {
    return (
      <AppContext.Consumer>
        {context => (
          <View style={{height: 500}}>
            {this.state.vista === 0 ? <View><AgregarMesas/><MostrarMesas setMesa={this.setMesa}/></View> : null}
            {this.state.vista === 1 ? <Mesa mesa={this.state.mesa} setVista={this.setVista}/> : null}
            {this.state.vista === 2 ? <Comandar setVista={this.setVista} productos={context.state.productos} mesa={this.state.mesa} /> : null }
          </View>
        )}
      </AppContext.Consumer>
    );
  }
}

class MostrarMesas extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      mesero: null
    }
  }

  renderMesas(mesas) {
    if(this.state.mesero === null) {
      return (
        mesas.map((mesa, index) => (
          <TouchableRipple key={index} onPress={() => this.props.setMesa(1, mesa)} onLongPress={() => this.props.setMesa(2, mesa)} rippleColor="rgba(43, 106, 235, 1)" underlayColor="rgba(43, 106, 235, 1)">
            <List.Item title={mesa.nombre} description={mesa.elementos.length + ' elementos'} right={props => <List.Icon {...props} icon='chevron-right' />}/>
          </TouchableRipple>
        ))
      );
    } else {
      return (
        mesas.filter(mesa => mesa.mesero.nombre === this.state.mesero.nombre).map((mesa, index) => (
          <TouchableRipple key={index} onPress={() => this.props.setMesa(1, mesa)} onLongPress={() => this.props.setMesa(2, mesa)} rippleColor="rgba(43, 106, 235, 1)" underlayColor="rgba(43, 106, 235, 1)">
            <List.Item title={mesa.nombre} description={mesa.elementos.length + ' elementos'} right={props => <List.Icon {...props} icon='chevron-right' />}/>
          </TouchableRipple>
        ))
      );
    }
  }

  render() {
    return (
      <AppContext.Consumer>
        {context => (
          <View>
            <View style={{backgroundColor: '#fff', borderRadius: 5, maxHeight: 350}}>
              <View style={{margin: 5, borderRadius: 5}}>
                <Picker selectedValue={this.state.mesero} style={{height: 40}} onValueChange={(itemValue, itemIndex) => this.setState({mesero: itemValue})}>
                  <Picker.Item label='Todos' value={null}/>
                  {context.state.personalSeleccionado.map(mesero => <Picker.Item key={mesero.nombre} label={mesero.nombre} value={mesero}/>)}
                </Picker>
              </View>
              <ScrollView>
                {this.renderMesas(context.state.mesas)}
              </ScrollView>
            </View>
          </View>
        )}
      </AppContext.Consumer>
    );
  }
}

class AgregarMesas extends React.Component {
  constructor() {
    super();
    this.state = {
      mesero: null,
      mesa: '',
      open: false
    }
    this.appear = new Animated.Value(45);
  }

  handlePress = () => {
    this.setState({
      open: !this.state.open
    });
    if(!this.state.open) {
      this.appearIn()
    } else {
      this.appearOut()
    }
  }

  appearIn = () => {
    Animated.timing(
      this.appear,
      {
        toValue: 200,
        duration: 500,
        easing: Easing.inOut(Easing.quad)
      },
    ).start();
  }

  appearOut = () => {
    Animated.timing(
      this.appear,
      {
        toValue: 45,
        duration: 500,
        easing: Easing.inOut(Easing.quad)
      },
    ).start();
  }

  agregarMesa = (callback, mesa, mesero) => {
    this.handlePress();
    this.setState({
      mesero: null,
      mesa: ''
    });
    callback(mesa, mesero);
  }

  render() {
    return (
      <AppContext.Consumer>
        {context => (
          <Animated.View style={[styles.container, {height: this.appear, overflow: 'hidden'}]}>
            <View>
              <Button icon="add" theme={Theme} mode="text" onPress={() => this.handlePress()}>
                Agregar mesa
              </Button>
              <Picker selectedValue={this.state.mesero} style={{height: 40}} onValueChange={(itemValue, itemIndex) => this.setState({mesero: itemValue})}>
                <Picker.Item label='Selecciona un mesero' value={null}/>
                {context.state.personalSeleccionado.map(mesero => <Picker.Item key={mesero.nombre} label={mesero.nombre} value={mesero}/>)}
              </Picker>
              <TextInput
                style={{marginTop: 5}}
                theme={Theme}
                mode="outlined"
                label='Mesa'
                value={this.state.mesa}
                onChangeText={mesa => this.setState({ mesa })}
              />
              <Button
                disabled={this.state.mesero === null || this.state.mesa === ''}
                style={{marginTop: 5}}
                theme={Theme}
                mode="contained"
                onPress={() => this.agregarMesa(context.agregarMesa, this.state.mesa, this.state.mesero)}>
                  Agregar
              </Button>
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
    marginBottom: 5,
    padding: 5,
  }
});
