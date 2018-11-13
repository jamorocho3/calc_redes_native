import React, { Component } from 'react';
import { 
  StyleSheet,
  TouchableOpacity,
  Text, 
  View 
} from 'react-native';
//componentes
import IP from '../Components/ip';
import NetworkMask from '../Components/network_mask';

export default class Home extends Component {
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
      network_mask: 0,
      disabled_ip: true,
      disabled_mask: true,
      disabled_button: true,
    }
    this.getNetworkMask = this.getNetworkMask.bind(this);
    this.getIp = this.bind(this);
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
        {/* recolectamos los datos: ip y máscara */}
        <View style={styles.contentView}>
          {/* componente que permite ingresar una ip */}
          <IP sendIP={this.getIp} />
          <Text style={styles.size}>Máscara de Subred</Text>
          {/* componente que muestra un select para elegir la subred */}
          <NetworkMask sendValue={this.getNetworkMask}/>
          <View style={{ alignItems: 'center' }}>
            {/* botón que envía la ip y la mascara de red 
              * se activa cuando los datos del mini-formulario han sido validados con exito
              * */}
            <TouchableOpacity
              title='Calcular'
              style={styles.submit}
              onPress={() => this.props.navigation.navigate('ResultScreen')}
              // disabled={this.state.disabled_button}>
              disabled={false}>
              <Text style={styles.submitText}>Calcular</Text>
            </TouchableOpacity>
          </View>
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
  getIP(val, isDisabled) {
    if (val != '') {
      if (isDisabled) this.setState({disabled_ip: false, ip_address: val})
      else this.setState({disabled_ip: true})
    }
  }
  /**
   * ### Funcion getNetworkMask
   * @param {Number} val mascara de red
   * 
   * Obtiene la mascara de red del componente hijo y setea las propiedades:
   * **disabled_mask** y **network_mask**
   */
  getNetworkMask(val) {
    if (val !== 0) this.setState({disabled_mask: false, network_mask: val})
    else this.setState({disabled_mask: true})
  }
}

const styles = StyleSheet.create({
  contentView: {
    marginTop: '5%',
    marginLeft: '10%', 
    marginRight: '10%', 
    marginBottom: '5%'
  },size: {
    fontSize: 13
  },submit: {
    backgroundColor: '#222222',
    paddingVertical: '4%',
    paddingHorizontal: '6%',
    borderRadius: 4
  },submitText : {
    color: 'white',
    fontSize: 18
  }
});