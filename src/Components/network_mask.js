import React, { Component } from "react";
import {
  View,
  Picker,
  Text,
  StyleSheet
} from "react-native";

export default class NetworkMask extends Component {
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
    this.state = { network_mask: '' };
  }
  /**
   * ### Render (Obligatorio)
   * Se encarga de renderizar en la vista movil el componente
   * 
   */
  render() {
    state = this.props.state;
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={{ width: '55%' }}>
          <Text style={styles.textLabel}>Decimal</Text>
          <Picker
            mode={'dialog'}
            selectedValue={this.state.network_mask}
            onValueChange={(itemIndex, itemValue) => {
              this.setState({ network_mask: itemIndex })
              this.props.sendValue(itemValue)
            }}>
            <Picker.Item label="Seleccione" />
            <Picker.Item label="128.0.0.0" value='0' />
            <Picker.Item label="192.0.0.0" value='1' />
            <Picker.Item label="224.0.0.0" value='2' />
            <Picker.Item label="240.0.0.0" value='3' />
            <Picker.Item label="248.0.0.0" value='4' />
            <Picker.Item label="252.0.0.0" value='5' />
            <Picker.Item label="254.0.0.0" value='6' />
            <Picker.Item label="255.0.0.0" value='7' />
            <Picker.Item label="255.128.0.0" value='8' />
            <Picker.Item label="255.192.0.0" value='9' />
            <Picker.Item label="255.224.0.0" value='10' />
            <Picker.Item label="255.240.0.0" value='11' />
            <Picker.Item label="255.248.0.0" value='12' />
            <Picker.Item label="255.252.0.0" value='13' />
            <Picker.Item label="255.254.0.0" value='14' />
            <Picker.Item label="255.255.0.0" value='15' />
            <Picker.Item label="255.255.128.0" value='16' />
            <Picker.Item label="255.255.192.0" value='17' />
            <Picker.Item label="255.255.224.0" value='18' />
            <Picker.Item label="255.255.240.0" value='19' />
            <Picker.Item label="255.255.248.0" value='20' />
            <Picker.Item label="255.255.252.0" value='21' />
            <Picker.Item label="255.255.254.0" value='22' />
            <Picker.Item label="255.255.255.0" value='23' />
            <Picker.Item label="255.255.255.128" value='24' />
            <Picker.Item label="255.255.255.192" value='25' />
            <Picker.Item label="255.255.255.224" value='26' />
            <Picker.Item label="255.255.255.240" value='27' />
            <Picker.Item label="255.255.255.248" value='28' />
            <Picker.Item label="255.255.255.252" value='29' />
            <Picker.Item label="255.255.255.254" value='30' />
            <Picker.Item label="255.255.255.255" value='31' />
          </Picker>
        </View>
        <View style={{ width: '45%' }} >
          <Text style={styles.textLabel}>Bits</Text>
          <Picker
            mode={'dialog'}
            selectedValue={this.state.network_mask}
            onValueChange={(itemIndex, itemValue) => {
              this.setState({ network_mask: itemIndex })
              this.props.sendValue(itemValue)
            }}>
            <Picker.Item label="Seleccione" value='' />
            <Picker.Item label="1" value='0' />
            <Picker.Item label="2" value='1' />
            <Picker.Item label="3" value='2' />
            <Picker.Item label="4" value='3' />
            <Picker.Item label="5" value='4' />
            <Picker.Item label="6" value='5' />
            <Picker.Item label="7" value='6' />
            <Picker.Item label="8" value='7' />
            <Picker.Item label="9" value='8' />
            <Picker.Item label="10" value='9' />
            <Picker.Item label="11" value='10' />
            <Picker.Item label="12" value='11' />
            <Picker.Item label="13" value='12' />
            <Picker.Item label="14" value='13' />
            <Picker.Item label="15" value='14' />
            <Picker.Item label="16" value='15' />
            <Picker.Item label="17" value='16' />
            <Picker.Item label="18" value='17' />
            <Picker.Item label="19" value='18' />
            <Picker.Item label="20" value='19' />
            <Picker.Item label="21" value='20' />
            <Picker.Item label="22" value='21' />
            <Picker.Item label="23" value='22' />
            <Picker.Item label="24" value='23' />
            <Picker.Item label="25" value='24' />
            <Picker.Item label="26" value='25' />
            <Picker.Item label="27" value='26' />
            <Picker.Item label="28" value='27' />
            <Picker.Item label="29" value='28' />
            <Picker.Item label="30" value='29' />
            <Picker.Item label="31" value='30' />
            <Picker.Item label="32" value='31' />
          </Picker>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textLabel: {
    fontSize: 13
  },
});