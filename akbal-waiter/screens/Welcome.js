import React from 'react';
import { Animated, Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import {ProgressBar} from 'react-native-paper';

export default class Welcome extends React.Component {
  constructor() {
    super();
    this.state = {
      porcentaje: 0
    }
    this.run = setInterval(this.setPorcentaje, 10);
    this.animate = new Animated.Value(0);
  }

  componentDidMount() {
    this.fadeIn();
  }

  fadeIn = () => {
     Animated.timing(
       this.animate,
       {
         toValue: 1,
         duration: 500,
       }
     ).start(); 
  }

  setPorcentaje = () => {
    let porcentaje = this.state.porcentaje + 0.025;
    this.setState({
      porcentaje
    });
    if(this.state.porcentaje > 1)
      clearInterval(this.run);
  }

  render() {
    return (
      <Animated.View style={[styles.container, {opacity: this.animate}]}>
        <Image
          style={{width:150, height: 160}}
          source={require('../assets/logo.png')}
        />
        <Text>Bienvenidos</Text>
        <ProgressBar progress={this.state.porcentaje} color='#212121' style={{width: 100}}/>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
