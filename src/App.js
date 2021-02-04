

import React,{Component} from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider } from 'react-redux'

import store from "./util/Store";
import  HomeScreen  from "./Pages/Home";
import  CartScreen  from "./Pages/Cart";
import ClientDetails from "./Pages/ClientDetails";
import PlacedOrder from "./Pages/PlacedOrder";

const Drawer = createDrawerNavigator();

class App extends Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return (
      <Provider store={store()}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="HomeScreen"  edgeWidth={0}>
          <Drawer.Screen name="HomeScreen" component={HomeScreen} options={{unmountOnBlur: true}}/>
          <Drawer.Screen name="ClientDetailsScreen" component={ClientDetails} options={{unmountOnBlur: true}}/>
          <Drawer.Screen name="CartScreen" component={CartScreen} options={{unmountOnBlur: true}}/>
          <Drawer.Screen name="PlaceOrderScreen" component={PlacedOrder} options={{unmountOnBlur: true}}/>
        </Drawer.Navigator>
      </NavigationContainer>
      </Provider>
    )
  }
}
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
