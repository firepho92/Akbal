import React from 'react';
import { Animated, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import {Appbar, Button, List, TouchableRipple} from 'react-native-paper';
import socketio from 'socket.io-client';

import Theme from '../Theme';

export default class Main extends React.Component {
  constructor(props) {
    super();
    this.state = {
      items: [],
      groupedItems: []
    }
    this.socket = socketio('http://192.168.100.4:8001', {transports: ['websocket']});
  }

  componentDidMount() {
    this.handleSocketIncoming();
  }

  handleSocketIncoming = () => {
    this.socket.on('barra', items => {
      this.setState({
        items
      });
    });
  }

  renderItems = () => {
    return this.state.items.map(item => (
      <Item item={item} />
    ));
  }

  render() {
    return (
      <View style={styles.body}>
        <Appbar.Header theme={Theme} style={{elevation: 2}}>
          <Appbar.Content
            title='Lista de barra'
          />
        </Appbar.Header>
        <View style={{padding: 10, maxHeight: 510}}>
          <View style={styles.container}>
            <ScrollView>
            {this.state.items.map((item, index) => (
              <Item key={index} item={item} index={index} />
            ))}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

class Item extends React.Component {
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
        <TouchableRipple onPress={() => console.log()}>
          <List.Item title={this.props.item.producto} description={this.props.item.nota} right={props => <Text>{this.props.item.cantidad}</Text>}/>
        </TouchableRipple>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 5
  },
  body: {
    backgroundColor: Theme.colors.background,
    height: Dimensions.get('window').height,
  }

});
