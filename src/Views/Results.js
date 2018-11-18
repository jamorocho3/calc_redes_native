import React, { Component } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';

export default class Results extends Component {
  constructor() {
    super()
    this.state = {
      isVisible: true,
      textButton: 'Decimal',
      red: '0.0.0.0',
      submascara_red: '0.0.0.0',
      host_ini: '0.0.0.0',
      host_fin: '0.0.0.0',
      broadcast: '0.0.0.0',
      clase: 'A',
    }
    this.bin2dec = this.bin2dec.bind(this)
    this.dec2bin = this.dec2bin.bind(this)
    this.pad = this.pad.bind(this)
  }
  toggle() {
    this.setState({ isVisible: !this.state.isVisible });
    // this.setState({textButton: this.state.isVisible ? 'Binario':'Decimal'})
    this.state.isVisible ? this.setState({ textButton: 'Binario' }) : this.setState({ textButton: 'Decimal' })
  }
  bin2dec(binary) { return parseInt(binary, 2) }
  dec2bin(decimal) { return parseInt(decimal.toString(2)) }
  pad(n, length) {
    let number = n.toString();
    while (number.length < length) {
      number = "0" + number;
    }
    return number;
  }
  componentWillMount() {
    const { navigation } = this.props;
    const ip_address = navigation.getParam('ip').split(".");
    const network_mask = navigation.getParam('mask');
    // calculo de variables
    const network = this.getNetwork(ip_address, network_mask.split("."));
    const broadcast = this.getBroadcast(ip_address, network_mask.split("."));
    const type = this.getClass(ip_address);
    const initRange = this.getInitialRange(network, network_mask);
    const finalRange = this.getFinalRange(broadcast, network_mask);

    this.setState({
      red: network,
      mascara_red: network_mask,
      clase: type,
      host_ini: initRange,
      host_fin: finalRange,
      broadcast: broadcast,
    });
  }
  render() {
    return (
      <ScrollView>
        <TouchableOpacity style={styles.buttonTop}
          onPress={this.toggle.bind(this)}>
          <Text style={[styles.textLarge, styles.textWhite]}>{this.state.textButton}</Text>
        </TouchableOpacity>
        <View style={styles.contentView}>
          {this.state.isVisible ? 
            <DecimalResults data={this.state} /> : <BinaryResults data={this.state} />}
        </View>
      </ScrollView>
    );
  }
  /**
   * ### Funcion getNetwork
   * @param {Array} ip direccion IP 
   * @param {Array} mask mascara de red
   * 
   * Realiza un AND binario entre los 
   */
  getNetwork(ip, mask) {
    let network = new Array;
    for (let i = 0; i < 4; i++) {
      network.push(parseInt(ip[i]) & parseInt(mask[i]));
    }
    return network.join('.');
  }
  /**
   * ### Funcion getClass
   * @param {[String]} param0 primer octeto de la ip
   * 
   * Calcula la clase de la direccion IP
   */
  getClass([first]) {
    const octeto1 = parseInt(first);
    let tipo = null;
    if (octeto1 == 127) tipo = "Loopback";
    if (octeto1 >= 0 && octeto1 <= 126) tipo = "A";
    if (octeto1 >= 128 && octeto1 <= 191) tipo = "B";
    if (octeto1 >= 192 && octeto1 <= 223) tipo = "C";
    if (octeto1 >= 224 && octeto1 <= 239) tipo = "D";
    if (octeto1 >= 240 && octeto1 <= 255) tipo = "E";
    return tipo;
  }
  /**
   * ### Funcion getInitialRange
   * @param {String} network red
   * @param {Array} mask mascara de red
   * 
   * El ultimo octeto es cambiado por el valor hexadecimal 0x1 
   */
  getInitialRange(network, mask) {
    //convertir la red en vector}
    const [first, second, third, fourth] = network.split(".");
    // si la mascara es 31 o 32 que tome los valores de la red y el broadcast
    if (mask === '255.255.255.254' || mask === '255.255.255.255') return network;
    // retornamos el valor del host inicial
    else return `${first}.${second}.${third}.${parseInt(fourth) + 1}`;
  }
  /**
   * ### Funcion getInitialRange 
   * @param {String} broadcast broadcast
   * @param {Array} mask mascara de red
   * 
   * El ultimo octeto es el valor menos de ese octeto
   */
  getFinalRange(broadcast, mask) {
    const [first, second, third, fourth] = broadcast.split(".");
    // si la mascara es 31 o 32 que tome los valores de la red y el broadcast
    if (mask === '255.255.255.254' || mask === '255.255.255.255') return broadcast;
    // retornamos el valor del host final
    else return `${first}.${second}.${third}.${parseInt(fourth) - 1}`;
  }
  /**
   * ### Función getBroadcast
   * @param {Array} ip direccion IP 
   * @param {Array} mask mascara de red
   * 
   * Realiza un or binario entre la ip y el resultado de un not binario entre 
   * la mascara y el valor 0xFF.
   * Realiza un join al array para formatearlo como una direccion de 32 bits.
   */
  getBroadcast(ip, mask) {
    let broadcast = new Array;
    // OR y NOT
    for (let i = 0; i < 4; i++) {
      broadcast.push(parseInt(ip[i]) | (~parseInt(mask[i]) & 0xFF)); 
    }
    return broadcast.join('.');
  }
  /**
   * ### Función getBinary
   * @param {String} address direccion 32 bits
   * 
   * Recibe una dirección de 32bits, la descompone y la transforma a binario
   */
  getBinary(address) {
    const [first, second, third, fourth] = address.split(".");
    return `${this.pad(this.dec2bin(parseInt(first)), 8)}.${this.pad(this.dec2bin(parseInt(second)), 8)}.${this.pad(this.dec2bin(parseInt(third)), 8)}.${this.pad(this.dec2bin(parseInt(fourth)), 8)}`;
  }
}
/**
 * ### DecimalResults (Stateless Component)
 * @param {Object} props propiedad data que se pasa al componente 
 * 
 * Muestra una vista con todas las propiedades que podemos encontrar de una red,
 * elementos imprescindibles para el subneteo
 */
const DecimalResults = (props) => {
  return (
    <View>
      {/* {Red */}
      <Text style={[styles.textSmall]}>Red</Text>
      <Text style={[styles.textMedium, styles.textBlack]}>{props.data.red}</Text>
      {/* Submascara de Red */}
      <Text style={[styles.textSmall]}>Máscara de Red</Text>
      <Text style={[styles.textMedium, styles.textBlack]}>{props.data.mascara_red}</Text>
      {/* Clase */}
      <Text style={[styles.textSmall]}>Clase</Text>
      <Text style={[styles.textMedium, styles.textBlack]}>{props.data.clase}</Text>
      {/* Inicio de Host */}
      <Text style={[styles.textSmall]}>Inicio de Host</Text>
      <Text style={[styles.textMedium, styles.textBlack]}>{props.data.host_ini}</Text>
      {/* Fin de host */}
      <Text style={[styles.textSmall]}>Fin de Host</Text>
      <Text style={[styles.textMedium, styles.textBlack]}>{props.data.host_fin}</Text>
      {/* Broadcast */}
      <Text style={[styles.textSmall]}>Broadcast</Text>
      <Text style={[styles.textMedium, styles.textBlack]}>{props.data.broadcast}</Text>
    </View>
  );
}
/**
 * ### BinaryResults (Stateless Component)
 * @param {Object} props propiedad data que se pasa al componente 
 * 
 * Muestra una vista con todas las propiedades que podemos encontrar de una red (en binario),
 * elementos imprescindibles para el subneteo
 */
const BinaryResults = (props) => {
  let bin = new Results();
  return (
    <View>
      {/* Red */}
      <Text style={[styles.textSmall]}>Red</Text>
      <Text style={[styles.textMedium, styles.textBlack]}>{bin.getBinary(props.data.red)}</Text>
      {/* Submascara de Red */}
      <Text style={[styles.textSmall]}>Máscara de Red</Text>
      <Text style={[styles.textMedium, styles.textBlack]}>{bin.getBinary(props.data.mascara_red)}</Text>
      {/* Clase */}
      <Text style={[styles.textSmall]}>Clase</Text>
      <Text style={[styles.textMedium, styles.textBlack]}>{props.data.clase}</Text>
      {/* Inicio de Host */}
      <Text style={[styles.textSmall]}>Inicio de Host</Text>
      <Text style={[styles.textMedium, styles.textBlack]}>{bin.getBinary(props.data.host_ini)}</Text>
      {/* Fin de host */}
      <Text style={[styles.textSmall]}>Fin de Host</Text>
      <Text style={[styles.textMedium, styles.textBlack]}>{bin.getBinary(props.data.host_fin)}</Text>
      {/* Broadcast */}
      <Text style={[styles.textSmall]}>Broadcast</Text>
      <Text style={[styles.textMedium, styles.textBlack]}>{bin.getBinary(props.data.broadcast)}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  contentView: {
    marginTop: '5%',
    marginLeft: '10%',
    marginRight: '10%',
    marginBottom: '60%'
  },
  textSmall: { fontSize: 14, },
  textMedium: { fontSize: 15, },
  textLarge: { fontSize: 18, },
  textBlack: { color: 'black' },
  textWhite: { color: 'white' },
  textContent: { paddingVertical: '1%', paddingLeft: '2%', backgroundColor: '#545454' },
  buttonTop: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#222222',
    paddingVertical: '3%'
  },
  label: {
    alignSelf: 'flex-end',
    fontSize: 18,
    color: 'black',
  },
  labelResult: {
    alignSelf: 'flex-start',
    fontSize: 18,
    color: 'black',
  },
  labelstart: {
    alignSelf: 'flex-start',
  }
});