import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import {Appbar, FAB, Portal, Provider} from 'react-native-paper';

import Meseros from './Meseros';
import Mesas from './Mesas';

import Theme from '../Theme';

export default class Main extends React.Component {
  constructor(props) {
    super();
    this.state = {
      tab: 'Meseros',
    }
  }

  setTab = (tab) => {
    this.setState({
      tab
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Appbar.Header theme={Theme} style={{elevation: 2}}>
            <Appbar.Content
              title={this.state.tab}
            />

          </Appbar.Header>
          <View style={{padding: 10, maxHeight: 500}}>
            { this.state.tab === 'Meseros' ? <Meseros/> : <Mesas/> }
          </View>
        </View>
        <AppNavigation setTab={this.setTab}/>
      </View>
    );
  }
}

class AppNavigation extends React.Component {
  state = {
    open: false,
  };

  render() {
    return (
      <Provider>
        <Portal>
          <FAB.Group
            theme={Theme}
            open={this.state.open}
            icon={this.state.open ? 'more-vert' : 'more-horiz'}
            actions={[
              { icon: 'people', label: 'Meseros', onPress: () => this.props.setTab('Meseros')},
              { icon: 'crop-square', label: 'Mesas', onPress: () => this.props.setTab('Mesas')},
            ]}
            onStateChange={({ open }) => this.setState({ open })}
            onPress={() => {
              if (this.state.open) {
                // do something if the speed dial is open
              }
            }}
          />
        </Portal>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('window').height,
    backgroundColor: Theme.colors.background
  }
});
