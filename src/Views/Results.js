import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';

export default class Results extends Component {
    render() {
      return(
        <View style={{ flex:1,alignItems:'center',justifyContent:'center' }}>
          <Text>Result Screen</Text>
          <Button
            title="Resultados"
            onPress={() => this.props.navigation.push('ResultScreen')}
          />
        </View>
      );
    }
  }