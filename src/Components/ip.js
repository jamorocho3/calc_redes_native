import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet
} from "react-native";

export default class IP extends Component {
  /**
   * ### Constructor
   * @param {Object} props propiedades presentes en el componente, incluye el state
   * 
   * Para inicializar un state en el componente es necesario hacerlo en el constructor
   * El constructor en un componente de React es llamado antes de que este sea montado.
   * Cuando implementamos el constructor para un componente de React, debemos llamar a
   * _super(props)_ antes de cualquier otra linea de código.
   * De otra manera _this.props_ será _undefined_ en el constructor, lo cual puede ocasionar bugs.
   */
  constructor(props) {
    super(props);
    this.state = {
      ip: '',
      state_ip: '',
      validating_ip: {
        width: 0,
        alignItems: 'center',
        justifyContent: 'center',
        height: 0,
        backgroundColor: '#fff',
      },
    };
  }
  /**
   * ### Render (Obligatorio)
   * Se encarga de renderizar en la vista movil el componente
   * 
   */
  render() {
    state = this.props.state;
    return (
      <View style={styles.contentView}>
        <Text style={styles.textLabel}>Dirección IP</Text>
        <TextInput
          style={styles.textInput}
          placeholder='Ingresa una dirección IP'
          keyboardType={'numeric'}
          onChangeText={(ip) => {
            isCorrect = !this.validarIP(ip)
            this.setState({ ip })
            // this.props.sendIP(ip, isCorrect)
            if (isCorrect) this.props.sendIP(ip, isCorrect)
            else this.props.sendIP(ip, isCorrect)
          }}
        />
        <View style={this.state.validating_ip}>
          <Text style={{ color: 'white' }}>{this.state.state_ip}</Text>
        </View>
      </View>
    );
  }
  /**
   * ### Función validarIP
   * @param {String} ip_address dirección IP
   * 
   * Funcion que recibe un string y valida si es una ip de 32 bits
   */
  validarIP(ip_address) {
    //cadena de validacion para una ip de 32 bits 
    let numcheck = /^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/;
    let octetos = ip_address.split(".");
    let error = false;
    if (ip_address.length == 0) return;
    // en el if se valida que no esten letras
    if (!numcheck.test(ip_address)) error = true;
    // en el forEach se valida que los numeros esten entre [0-255] y la cadena no este vacia ni indefinida
    octetos.forEach((valor) => {
      if (parseInt(valor) > 255 || parseInt(valor) < 0 || valor == "" || typeof valor == 'undefined') error = true;
    });
    if (error == true) {
      this.setState({
        state_ip: 'IP NO VÁLIDA',
        validating_ip: {
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          height: 40,
          backgroundColor: '#CF2A27'
        }
      })
    } else if (error == false) {
      // si el error es false coloca la mascara por defecto para esa red
      this.setState({
        state_ip: 'IP VÁLIDA',
        validating_ip: {
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          height: 40,
          backgroundColor: '#009E0F'
        }
      })
      // TODO: proxima actualización
      //   let clase = this.calcularCLASE(octetos);
      //   if(clase == 'A' || clase == 'Loopback') this.networkMask = '7';
      //   if(clase == 'B') this.networkMask = '15';
      //   if(clase == 'C') this.networkMask = '23';
    }
    return error;
  }
}

const styles = StyleSheet.create({
  contentView: { marginBottom: 10 },
  textLabel: { fontSize: 13 },
  textInput: { height: 40 }
});