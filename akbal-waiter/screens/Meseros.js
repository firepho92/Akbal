import React from 'react';
import { Animated, ScrollView, StyleSheet, View } from 'react-native';
import { List, TouchableRipple } from 'react-native-paper';

import AppContext from '../context/AppContext';

export default class Meseros extends React.Component {
  constructor() {
    super();
    this.fade = new Animated.Value(0);
  }

  componentDidMount() {
    this.fadeIn();
  }

  fadeIn = () => {
    this.fade.setValue(0);
     Animated.timing(
       this.fade,
       {
         toValue: 1,
         duration: 1000,
       }
     ).start(); 
  }

  render() {
    return (
      <AppContext.Consumer>
          {context => (
            <Animated.View style={{height: 500, opacity: this.fade}}>
              <View style={styles.meseros}>
                <ScrollView>
                  {context.state.empleados.map(empleado => {
                    return (
                      <TouchableRipple key={empleado.id_empleado} onPress={() => context.handleToggle(empleado)} rippleColor="rgba(43, 106, 235, 1)" underlayColor="rgba(43, 106, 235, 1)">
                          <List.Item title={empleado.nombre} right={props => <List.Icon {...props} icon={context.estaSeleccionado(empleado) ? 'done' : 'person-add'} />}/>
                      </TouchableRipple>
                    );
                  })}
                </ScrollView>
              </View>
            </Animated.View>
          )}
      </AppContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  meseros: {
    backgroundColor: '#fff',
    borderRadius: 5,
  }
});
