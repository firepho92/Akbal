import React, { Component } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native'

import Theme from '../Theme';

export default class Loading extends Component {
  componentDidMount() {
    this.props.handleReady();
  }
  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
});
