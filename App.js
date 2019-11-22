import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ListaRestaurantes from './src/ListaRestaurantes';
import DetalheRestaurante from './src/DetalheRestaurante';

const MainNavigator = createStackNavigator({
  ListaRestaurantes: { screen: ListaRestaurantes },
  DetalheRestaurante: { screen: DetalheRestaurante },
});

const App = createAppContainer(MainNavigator);

export default App;