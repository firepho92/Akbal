import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import {Appbar} from 'react-native-paper';
import openSocket from 'socket.io-client';
const  socket = openSocket('http://192.168.100.4:8000');

import Theme from '../Theme';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
      selectedIndex: null
    }
  }

  setItems = (items) => {
    console.log(items)
    this.setState({
      items
    });
  }

  handlePress = (index) => {

  }

  render() {
    socket.on('barra', (elementos) => console.log(elementos));
    return (
      <ScrollView style={styles.container}>
        {this.state.items.map(item => <Item  elemento={item}/>)}
      </ScrollView>
    );
  }
}

class Item extends React.Component {
  render() {
    return (
      <TouchableRipple onPress={() => console.log(this.props.elemento)/*this.props._handlePress(this.props.index)*/} rippleColor="rgba(43, 106, 235, 1)" underlayColor="rgba(43, 106, 235, 1)">
        <View style={{alignItems: 'center', display: 'flex', flexDirection: 'row', height: 50}}>
          <Text style={{flex: 1, textAlign: 'center'}}>{this.props.elemento.p}</Text>
        </View>
      </TouchableRipple>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: Theme.roundness,
    maxHeight: 400
  },
});
