import React, { Component } from "react";
import { Card } from 'react-native-elements'
import { StyleSheet, TextInput, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

export default class IP extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '#232323', background: 'white', check: 'md-help' }
  }
  render() {
    return (
      <Card
        containerStyle={[{ backgroundColor: this.state.background }, style.card]}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: '70%' }}>
            <Text style={{ color: this.state.text }}>
              Dirección IP
            </Text>
            <TextInput
              placeholder='Ingresa una dirección IP'
              keyboardType={'decimal-pad'}
              style={style.input}
              onChangeText={ip => {
                let pos = this.validarIP(ip)
                if (pos === 0) this.setState({ text: '#232323', background: 'white', check: 'md-help' });
                else if (pos === 1) this.setState({ text: 'white', background: '#ff5f52', check: 'md-close-circle' });
                else if (pos === 2) this.setState({ text: 'white', background: '#439889', check: 'md-checkmark-circle' });
                this.props.sendIP(ip, pos)
              }} />
          </View>
          <View style={{ flex:1,justifyContent: "center",alignItems: "center" }}>
            <Icon name={this.state.check} size={40} color={this.state.text} />
          </View>
        </View>
      </Card>
    );
  }
  /**
   * ### Función validarIP
   * @param {String} ip_address dirección IP
   * 
   * Funcion que recibe un string y valida si es una ip de 32 bits
   */
  validarIP(ip_address) {
    let regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    let isValid = regex.test(ip_address);
    // Se realiza una validacion con regex para una ip de 32 bits
    if (ip_address.length == 0) return 0; // null
    else if (!isValid) return 1; // false
    else if (isValid) return 2; // true
  }
}

const style = StyleSheet.create({
  card: { padding: '5%', borderWidth: 0 },
  input: { color: 'white', paddingTop: '4%', paddingBottom: '0%' }
});