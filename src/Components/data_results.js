import React, { Component } from "react";
import { FormLabel,Card } from 'react-native-elements'
import {
  View,
  Text,
  StyleSheet
} from "react-native";

export default class DataResults extends Component {
  render() {
    return (
      <Card>
        <FormLabel>Red</FormLabel>
        <Text style={styles.textMedium}>{this.props.data.red}</Text>
        <FormLabel>Máscara de Red</FormLabel>
        <Text style={styles.textMedium}>{this.props.data.mascara_red}</Text>
        <FormLabel>Clase</FormLabel>
        <Text style={styles.textMedium}>{this.props.data.clase}</Text>
        <FormLabel>Inicio de Host</FormLabel>
        <Text style={styles.textMedium}>{this.props.data.host_ini}</Text>
        <FormLabel>Fin de Host</FormLabel>
        <Text style={styles.textMedium}>{this.props.data.host_fin}</Text>
        <FormLabel>Broadcast</FormLabel>
        <Text style={styles.textMedium}>{this.props.data.broadcast}</Text>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  textMedium: { 
    fontSize: 16, 
    color: 'black',
    marginLeft: '6%'
  }
});