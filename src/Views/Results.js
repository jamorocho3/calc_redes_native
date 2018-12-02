import React, { Component } from 'react';
import { Divider } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { ScrollView, StyleSheet, TouchableWithoutFeedback, Text } from 'react-native';
// Components
import DataResults from "../Components/data_results";

export default class Results extends Component {
  static navigationOptions = {
    title: 'Resultados',
    headerStyle: {
      backgroundColor: '#00685b',
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: 'white'
    },
  };
  /**
   * ### Constructor
   * 
   * Para inicializar un state en el componente es necesario hacerlo en el constructor
   * El constructor en un componente de React es llamado antes de que este sea montado.
   * Cuando implementamos el constructor para un componente de React, debemos llamar a
   * _super(props)_ antes de cualquier otra linea de código.
   * De otra manera _this.props_ será _undefined_ en el constructor, lo cual puede ocasionar bugs.
   */
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
    this.setState({textButton: this.state.isVisible ? 'Binario':'Decimal'});
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
        {/* Toogle button */}
        <TouchableWithoutFeedback onPress={this.toggle.bind(this)}>
          <Animatable.View iterationCount="infinite" animation="pulse" style={styles.buttonTop}>
            <Text style={styles.buttonTextStyle}>{this.state.textButton}</Text>
          </Animatable.View>
        </TouchableWithoutFeedback>
        {/* Resultados */}
        {this.state.isVisible ? <DataResults data={this.state}/> :
          <DataResults data={{
              red: this.getBinary(this.state.red),
              mascara_red: this.getBinary(this.state.mascara_red),
              clase: this.state.clase,
              host_ini: this.getBinary(this.state.host_ini),
              host_fin: this.getBinary(this.state.host_fin),
              broadcast: this.getBinary(this.state.broadcast),
          }}/>
        }
        <Divider style={styles.divider} />
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

const styles = StyleSheet.create({
  divider: {
    marginLeft: '4%',
    marginRight: '4%',
    backgroundColor: '#00695c',
    marginTop: '4%'
  },
  buttonTop: {
    marginTop: '4%',
    marginLeft:'4%',
    marginRight:'4%',
    paddingTop: '4%',
    paddingBottom: '4%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#439688"
  },
  buttonTextStyle: {
    fontWeight: "bold",
    fontSize: 18,
    color: 'white'
  }
});