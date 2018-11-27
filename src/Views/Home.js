import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Divider } from 'react-native-elements';
//componentes
import IP from '../Components/ip';
import NetworkMask from '../Components/network_mask';

export default class Home extends Component {
  static navigationOptions = {
    title: 'Calculadora IP',
    headerStyle: {
      backgroundColor: '#00685b',
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      color: 'white'
    },
  };
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
      ip_address: '',
      network_mask: '',
      bg_ip: 'white',
      ctxt_ip: '',
      disabled_ip: true,
      disabled_mask: true,
      disabled_button: true,
    }
    this.getNetworkMask = this.getNetworkMask.bind(this);
    this.getIp = this.getIp.bind(this);
  }
  /**
   * ### Render (Obligatorio)
   * Se encarga de renderizar en la vista movil el componente
   * 
   */
  render() {
    this.state.disabled_button = (this.state.disabled_ip == false && this.state.disabled_mask == false) ? false : true;
    return(
      <View>
          <IP sendIP={this.getIp} />
          <NetworkMask sendValue={this.getNetworkMask}/>
        <View style={styles.contentView}>
          <Button
            raised
            backgroundColor={styles.primary.color} 
            borderRadius={2}
            icon={{name: 'cached'}}
            disabled={this.state.disabled_button}
            onPress={() => this.props.navigation.navigate('ResultScreen', {ip: this.state.ip_address, mask: this.state.network_mask})}
            large={false}
            title='CALCULAR' />
          <Divider style={styles.divider} />
        </View>
      </View>
    );
  }
  /**
   * ### Funcion getIP
   * @param {String} val dirección ip
   * @param {Boolean} isDisabled estado del componente
   * 
   * Obtiene la ip del componente hijo y setea las propiedades:
   * **disabled_ip** y **select_mask**
   */
  getIp(val, isDisabled) {
    if (val != '') {
      if (isDisabled) this.setState({bg_ip: '#439889', ctxt_ip: 'white', disabled_ip: false, ip_address: val})
      else this.setState({bg_ip: '#ff5f52', ctxt_ip: 'white', disabled_ip: true})
    } else this.setState({bg_ip: 'white', ctxt_ip: 'black'});
  }
  /**
   * ### Funcion getNetworkMask
   * @param {String} val mascara de red
   * 
   * Obtiene la mascara de red del componente hijo y setea las propiedades:
   * **disabled_mask** y **network_mask**
   */
  getNetworkMask(val) {
    if (val !== '') this.setState({disabled_mask: false, network_mask: val})
    else this.setState({disabled_mask: true})
  }
}

const styles = StyleSheet.create({
  primary: { color: '#00695c' },
  contentView: {
    marginTop: '4%',
    marginBottom: '2%'
  }, size: {
    fontSize: 13
  }, divider: {
    marginLeft: '4%',
    marginRight: '4%',
    backgroundColor: '#00695c',
    marginTop: '4%'
  }
});