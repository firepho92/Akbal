import React from 'react';
import { BackHandler, StyleSheet, Text, View } from 'react-native';
import {Button, List} from 'react-native-paper';

import Theme from '../Theme';

export default class Mesa extends React.Component {

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentDidCathch() {
    console.log(this.state.mesa);
  }

  handleBackPress = () => {
    this.props.setVista(0);
    return true;
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 5}}>Mesa {this.props.mesa.nombre}</Text>
        </View>
        <View style={[styles.container, {padding: 0}]}>
          {this.props.mesa.elementos.map((elemento, index) => (
            <List.Item key={index} title={elemento.producto.producto} description={elemento.cantidad}/>
          ))}
        </View>
        <Button theme={Theme} mode="contained" onPress={() => this.props.setVista(2)}>Agregar</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 5,
    marginBottom: 5,
    overflow: 'hidden'
  }
});
