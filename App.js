import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';

// Vistas
import Home from "./src/Views/Home";
import Results from "./src/Views/Results";

const RootStack = createStackNavigator({
  HomeScreen: Home,
  ResultScreen: Results,
},{
  initialRouteName: 'HomeScreen'
});

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}