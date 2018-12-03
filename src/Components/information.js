import React, { Component } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Card } from "react-native-elements";

export default class Info extends Component {
  render() {
    return (
      <ScrollView style={{ height: '100%' }}>
        <Card
          containerStyle={[{ backgroundColor: "green" }, style.card]}>
          <Text style={{ color: "white" }}>RANGO HOSTS</Text>
          <Text style={{ color: "white" }}>Muestra el rango de direcciónes IP, pertenecientes a la red, que se podrán configurar en los hosts.</Text>
        </Card>
        <Card
          containerStyle={[{ backgroundColor: "green" }, style.card]}>
          <Text style={{ color: "white" }}>BROADCAST</Text>
          <Text style={{ color: "white" }}>Muestra la dirección de broadcast de la red. Esta es una dirección especial que apunta a todos los host activos de una red IP.</Text>
        </Card>
        <Card
          containerStyle={[{ backgroundColor: "green" }, style.card]}>
          <Text style={{ color: "white" }}>TIPO</Text>
          <Text style={{ color: "white" }}></Text>
        </Card>
        <Card
          containerStyle={[{ backgroundColor: "green" }, style.card]}>
          <Text style={{ color: "white" }}>DIRECCIÓN IP</Text>
          <Text style={{ color: "white" }}>Inicialmente se muestra tu dirección IP, la IP real desde la que te conectas. Esta IP puedes modificarla para realizar el subneteo.</Text>
        </Card>
        <Card
          containerStyle={[{ backgroundColor: "green" }, style.card]}>
          <Text style={{ color: "white" }}>MÁSCARA</Text>
          <Text style={{ color: "white" }}>Inicialmente se muestra la máscara de red según la Clase de la DIRECCIÓN IP, para cálculos de redes classful, pero si deseas realizar subneteo con VLSM (Variable Length Subnet Mask), puede ser modificada. Selecciona la máscara de red en el formato que desees, ya que dispones de tres formatos distintos para la elección de la máscara de red.</Text>
        </Card>
        <Card
          containerStyle={[{ backgroundColor: "green" }, style.card]}>
          <Text style={{ color: "white" }}>RED</Text>
          <Text style={{ color: "white" }}>Muestra la red definida por la DIRECCIÓN IP y la MÁSCARA elegidas en los campos anteriores.</Text>
        </Card>
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  card: { padding: '5%', borderWidth: 0 },

});