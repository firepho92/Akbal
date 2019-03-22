import React from 'react';
import { Dimensions, List, ScrollView, StyleSheet, Text, View } from 'react-native';
import {Appbar, Button} from 'react-native-paper';


export default class App extends React.Component {
  static navigationOptions = {
    header: null,
  };


  render() {
    return (
      <View>
        <Text>hola</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Expo.registerRootComponent(App);