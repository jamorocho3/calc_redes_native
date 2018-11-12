import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';

export default class Home extends Component {
    render() {
      return(
        <View style={{ flex:1,alignItems:'center',justifyContent:'center' }}>
          <Text>Home Screen</Text>
          <Button
            title="Resultados"
            onPress={() => this.props.navigation.navigate('ResultScreen')}
          />
        </View>
      );
    }
  }