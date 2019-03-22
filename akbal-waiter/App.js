import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';

import Welcome from './screens/Welcome';
import Main from './screens/Main';

import ContextProvider from './context/ContextProvider';

export default class App extends React.Component {
  state = {
    phase: 0
  };

  componentDidMount() {
    var delayInMilliseconds = 1000;
    var self = this;
    setTimeout(function() {
      self.setState({
        phase: 1
      });
    }, delayInMilliseconds);
  }

  setTab = (phase) => {
    this.setState({
      phase
    });
  }

  render() {
    return(
      <ContextProvider>
        { this.state.phase === 0 ? <Welcome /> : <Main setTab={this.setTab} /> }
      </ContextProvider>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

Expo.registerRootComponent(App);