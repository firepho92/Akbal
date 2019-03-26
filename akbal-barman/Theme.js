import {DefaultTheme} from 'react-native-paper';

export default Theme = {
  ...DefaultTheme,
  containerMaxHeight: {height: 465},
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3f51b5',
    accent: '#424242',
    surface: '#fff',
    background: '#f5f6fa'
  }
}