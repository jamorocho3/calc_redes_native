import React, { Component } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';

export default class Results extends Component {
  constructor() {
    super()
    this.state = {
      //TODO: Separar por secciones el state para que el no afecte mucho el paso de parametros
      isVisible: true,
      textButton: 'Decimal',
      red_dec: '',
      host_ini_dec: "",
      host_fin_dec: "",
      broadcast_dec: "",
      clase_red: "",
      red_bin: "",
      submascara_red_bin: "",
      host_ini_bin: "",
      host_fin_bin: "",
      broadcast_bin: "",
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
    while (number.length < length)
      number = "0" + number;
    return number;
  }
  componentWillMount() {
    //TODO: refactorizar
    const { navigation } = this.props;
    const ip_address = navigation.getParam('ip');
    const networkMask = navigation.getParam('mask');
    const ip_octetos = ip_address.split(".");
    const mask = parseInt(networkMask);
    this.setState({
      red_dec: this.calcularRED(ip_octetos, mask),
      broadcast_dec: this.calcularBROADCAST(ip_octetos, mask),
      clase_red: this.calcularCLASE(ip_octetos),
      submascara_red_bin: this.calcularSUBMASK(mask)
    })

    this.setState({
      host_ini_dec: this.calcularRANGOINICIAL(this.state.red_dec, mask),
      host_fin_dec:   this.calcularRANGOFINAL(this.state.red_dec, this.state.broadcast_dec, mask),
      red_bin: this.calcularBINARY(this.state.red_dec),
      host_ini_bin: this.calcularBINARY(this.state.host_ini_dec),
      host_fin_bin: this.calcularBINARY(this.state.host_fin_dec),
      broadcast_bin: this.calcularBINARY(this.state.broadcast_dec)
    })
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
  calcularRED(ipArray, mask) {
    //decimales separados
    let [octeto1, octeto2, octeto3, octeto4] = ipArray;
    //formar una cadena de 32 bits y separarlos en un array
    let ip_binary = this.pad(this.dec2bin(parseInt(octeto1)), 8) +
      this.pad(this.dec2bin(parseInt(octeto2)), 8) +
      this.pad(this.dec2bin(parseInt(octeto3)), 8) +
      this.pad(this.dec2bin(parseInt(octeto4)), 8);
    let ip_binary_array = ip_binary.split("");
    // obtener la red
    let red = [];
    let oct1 = "", oct2 = "", oct3 = "", oct4 = "";
    for (let i = 0; i < 32; i++) {
      red[i] = ip_binary_array[i];
      if (mask < (i + 1)) { red[i] = "0"; }
      //separamos el array en conjuntos de 8 
      if (i <= 7) { oct1 += red[i]; }
      if (i >= 8 && i <= 15) { oct2 += red[i]; }
      if (i >= 16 && i <= 23) { oct3 += red[i]; }
      if (i >= 24 && i <= 31) { oct4 += red[i]; }
    }
    // volvemos a decimal cada conjunto
    return this.bin2dec(oct1) + '.' + this.bin2dec(oct2) + '.' + this.bin2dec(oct3) + '.' + this.bin2dec(oct4);
  }
  calcularCLASE([first]) {
    // let [first] = ipArray;
    let octeto1 = parseInt(first);
    let tipo = null;
    if (octeto1 == 127) tipo = "Loopback";
    if (octeto1 >= 0 && octeto1 <= 126) tipo = "A";
    if (octeto1 >= 128 && octeto1 <= 191) tipo = "B";
    if (octeto1 >= 192 && octeto1 <= 223) tipo = "C";
    if (octeto1 >= 224 && octeto1 <= 239) tipo = "D";
    if (octeto1 >= 240 && octeto1 <= 255) tipo = "E";
    return tipo;
  }
  calcularRANGOINICIAL(red_str, mask) {
    //convertir la red en vector
    let red = red_str.split(".");
    //convertimos el ultimo octeto a numero
    let oct4_red = parseInt(red[3]);
    //condiciones para mostrar el rango
    if (mask < 31) {
      oct4_red = oct4_red + 1;
    }
    return red[0] + '.' + red[1] + '.' + red[2] + '.' + oct4_red;
  }
  calcularRANGOFINAL(red_str, broadcast_str, mask) {
    //convertir la red y el broadcast en vector
    let red = red_str.split(".");
    let broadcast = broadcast_str.split(".");
    //convertimos el ultimo octeto a numero
    let oct4_red = parseInt(red[3]);
    var oct4_broadcast = parseInt(broadcast[3]);
    //condiciones para mostrar el rango
    if (mask < 31) { oct4_broadcast = oct4_broadcast - 1; }
    if (mask == 32) { oct4_broadcast = oct4_red; }
    return broadcast[0] + '.' + broadcast[1] + '.' + broadcast[2] + '.' + oct4_broadcast;
  }
  calcularBROADCAST(ipArray, mask) {
    //decimales separados
    let octeto1 = parseInt(ipArray[0]);
    let octeto2 = parseInt(ipArray[1]);
    let octeto3 = parseInt(ipArray[2]);
    let octeto4 = parseInt(ipArray[3]);
    //formar una cadena de 32 bits y separarlos en un array
    let ip_binary = this.pad(this.dec2bin(octeto1), 8) + this.pad(this.dec2bin(octeto2), 8) + this.pad(this.dec2bin(octeto3), 8) + this.pad(this.dec2bin(octeto4), 8);
    let ip_binary_array = ip_binary.split("");
    // obtener el broadcast
    let broadcast = [];
    let oct1 = "", oct2 = "", oct3 = "", oct4 = "";
    for (let i = 0; i < 32; i++) {
      broadcast[i] = ip_binary_array[i];
      if (mask < (i + 1)) { broadcast[i] = "1"; }
      //separamos el array en conjuntos de 8 
      if (i <= 7) { oct1 += broadcast[i]; }
      if (i >= 8 && i <= 15) { oct2 += broadcast[i]; }
      if (i >= 16 && i <= 23) { oct3 += broadcast[i]; }
      if (i >= 24 && i <= 31) { oct4 += broadcast[i]; }
    }
    // volvemos a decimal cada conjunto
    return `${this.bin2dec(oct1)}.${this.bin2dec(oct2)}.${this.bin2dec(oct3)}.${this.bin2dec(oct4)}`
  }
  calcularBINARY(address) {
    let octetos = address.split(".");
    return `${this.pad(this.dec2bin(parseInt(octetos[0])), 8)}.
          ${this.pad(this.dec2bin(parseInt(octetos[1])), 8)}.
          ${this.pad(this.dec2bin(parseInt(octetos[2])), 8)}.
          ${this.pad(this.dec2bin(parseInt(octetos[3])), 8)}`;
  }
  calcularSUBMASK(mask) {
    let array = [];
    let oct1 = "", oct2 = "", oct3 = "", oct4 = "";
    for (let index = 0; index < 32; index++) {
      array[index] = "1";
      if (mask < (index + 1)) { array[index] = "0"; }
      //separamos el array en conjuntos de 8 
      if (index <= 7) { oct1 += array[index]; }
      if (index >= 8 && index <= 15) { oct2 += array[index]; }
      if (index >= 16 && index <= 23) { oct3 += array[index]; }
      if (index >= 24 && index <= 31) { oct4 += array[index]; }
    }
    // volvemos a decimal cada conjunto
    return `${oct1}.${oct2}.${oct3}.${oct4}`;
  }
}

const DecimalResults = (props) => {
  return (
    <View>
      {/* {Red */}
      <Text style={[styles.textSmall]}>Red</Text>
      <Text style={[styles.textMedium, styles.textBlack]}>{props.data.red_dec}</Text>
      {/* Submascara de Red */}
      <Text style={[styles.textSmall]}>Submáscara de Red</Text>
      <Text style={[styles.textMedium, styles.textBlack]}>{props.data.clase_red}</Text>
      {/* Clase */}
      <Text style={[styles.textSmall]}>Clase</Text>
      <Text style={[styles.textMedium, styles.textBlack]}>{props.data.clase_red}</Text>
      {/* Inicio de Host */}
      <Text style={[styles.textSmall]}>Inicio de Host</Text>
      <Text style={[styles.textMedium, styles.textBlack]}>192.168.0.1</Text>
      {/* Fin de host */}
      <Text style={[styles.textSmall]}>Fin de Host</Text>
      <Text style={[styles.textMedium, styles.textBlack]}>192.168.0.1</Text>
      {/* Broadcast */}
      <Text style={[styles.textSmall]}>Broadcast</Text>
      <Text style={[styles.textMedium, styles.textBlack]}>{props.data.broadcast_dec}</Text>
    </View>
  );
}
const BinaryResults = (props) => {
  return (
    <View>
      {/* Red */}
      <Text style={[styles.textSmall]}>Red</Text>
      <Text style={[styles.textMedium, styles.textBlack]}>00000000.00000000.00000000.00000000</Text>
      {/* Submascara de Red */}
      <Text style={[styles.textSmall]}>Submáscara de Red</Text>
      <Text style={[styles.textMedium, styles.textBlack]}>{props.data.submascara_red_bin}</Text>
      {/* Clase */}
      <Text style={[styles.textSmall]}>Clase</Text>
      <Text style={[styles.textMedium, styles.textBlack]}>192.168.0.1</Text>
      {/* Inicio de Host */}
      <Text style={[styles.textSmall]}>Inicio de Host</Text>
      <Text style={[styles.textMedium, styles.textBlack]}>00000000.00000000.00000000.00000000</Text>
      {/* Fin de host */}
      <Text style={[styles.textSmall]}>Fin de Host</Text>
      <Text style={[styles.textMedium, styles.textBlack]}>00000000.00000000.00000000.00000000</Text>
      {/* Broadcast */}
      <Text style={[styles.textSmall]}>Broadcast</Text>
      <Text style={[styles.textMedium, styles.textBlack]}>00000000.00000000.00000000.00000000</Text>
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