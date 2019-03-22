import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Appbar} from 'react-native-paper';

import ItemsScreen from './ItemsScreen';

import Theme from '../Theme';

export default class App extends React.Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <View style={styles.container}>
        <Appbar.Header theme={Theme}>
          <Appbar.Content
            title="Barra"
          />
        </Appbar.Header>
        <View style={styles.body}>
          <ItemsScreen />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    padding: 10,
  },
  container: {
    width: 500,
    flex: 1,
    backgroundColor: Theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
