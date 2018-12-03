import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Divider } from 'react-native-elements';
//componentes
import IP from '../Components/ip';
import NetworkMask from '../Components/network_mask';
import Info from '../Components/information';

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
      disabled_ip: true,
      disabled_network: true,
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
    return(
      <View>
        <View style={{ height: '55%'}}>
          <IP sendIP={this.getIp} />
          <NetworkMask sendValue={this.getNetworkMask}/>
          <Button
            containerViewStyle={{ marginTop: '4%'}}
            raised
            backgroundColor={styles.primary.color}
            borderRadius={2}
            icon={{name: 'cached'}}
            disabled={(!this.state.disabled_ip && !this.state.disabled_network) ? false : true}
            onPress={() => this.props.navigation.navigate('ResultScreen', {ip: this.state.ip_address, mask: this.state.network_mask})}
            title='CALCULAR' />
          <Divider style={styles.divider} />
        </View>
        <View style={{ height: '45%'}}>
          <Info />
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
    if (val !== '') {
      if (isDisabled == 0 || isDisabled == 1) this.setState({disabled_ip: true});
      else this.setState({disabled_ip: false, ip_address: val});
    }
  }
  /**
   * ### Funcion getNetworkMask
   * @param {String} val mascara de red
   * 
   * Obtiene la mascara de red del componente hijo y setea las propiedades:
   * **disabled_mask** y **network_mask**
   */
  getNetworkMask(val, isDisabled) {
    this.setState({network_mask: val, disabled_network: isDisabled})
  }
}

const styles = StyleSheet.create({
  primary: { color: '#00695c' },
  contentView: { marginTop: '4%', },
  size: { fontSize: 13 }, 
  divider: {
    marginLeft: '4%',
    marginRight: '4%',
    backgroundColor: '#00695c',
    marginTop: '4%'
  }
});



// import React, { Component } from 'react';
// import {
//   StyleSheet,
//   View,
//   Dimensions
// } from 'react-native';
 
// import IP from '../Components/ip';


// var { height } = Dimensions.get('window');
 
// var box_count = 2;
// var box_height = (height - 30) / box_count;
 
// export default class VerticalStackLayout extends Component {
//   render() {
//     return (
//         <View style={styles.container}>
//             <View style={[styles.box, styles.box1]}>
//             </View>
//             <View style={[styles.box, styles.box2]}></View>
//         </View>
//     );
//   }
// }
 
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column'
//   },
//   box: {
//     height: box_height
//   },
//   box1: {
//     backgroundColor: '#2196F3'
//   },
//   box2: {
//     backgroundColor: '#8BC34A'
//   }
// });