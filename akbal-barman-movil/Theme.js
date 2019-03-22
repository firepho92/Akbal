import {DefaultTheme} from 'react-native-paper';

export default Theme = {
  ...DefaultTheme,
  containerMaxHeight: {height: 465},
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: '#212121',
    accent: '#424242',
    surface: '#fff',
    background: '#f5f6fa'
  }
}