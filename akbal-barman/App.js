import React from 'react';
import { StyleSheet } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
console.ignoredYellowBox = ['Remote debugger'];
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);

import Welcome from './screens/Welcome';
import Main from './screens/Main';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      phase: 0
    }
  }

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
      this.state.phase === 0 ? <Welcome /> : <Main />
    );
  }

}

Expo.registerRootComponent(App);