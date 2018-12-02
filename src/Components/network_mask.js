import React, { Component } from "react";
import { Card } from 'react-native-elements';
import { View, Picker, Text, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
// data
import { value } from "../Res/data/network.json";

export default class NetworkMask extends Component {
  constructor() {
    super();
    this.state = {
      network_mask: '',
      text: 'white',
      background: '#ff5f52',
      check: 'md-close-circle'
    }
  }

  render() {
    return (
      <Card
        containerStyle={[{ backgroundColor: this.state.background }, style.card]}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: '70%' }}>
            <Text style={{ color: this.state.text }}>
              Máscara de Subred
            </Text>
            <Picker
              mode={'dialog'}
              style={{ color: this.state.text, backgroundColor: this.state.background }}
              selectedValue={this.state.network_mask}
              onValueChange={(itemValue, itemIndex) => {
                if (itemIndex > 0) {
                  this.setState({ network_mask: itemValue, background: '#439889', check: 'md-checkmark-circle' });
                  this.props.sendValue(itemValue, false)
                } else {
                  this.setState({ network_mask: itemValue, background: '#ff5f52', check: 'md-close-circle' });
                  this.props.sendValue(itemValue, true)
                }
              }}>
              {value.map((data, i) => { return <Picker.Item label={data.opt} value={data.val} key={i} /> })}
            </Picker>
          </View>
          <View style={style.icon}>
            <Icon name={this.state.check} size={40} color={this.state.text} />
          </View>
        </View>
      </Card>
    );
  }
}

const style = StyleSheet.create({
  card: { padding: '5%', borderWidth: 0 },
  icon: { width: '30%', flex: 1, justifyContent: "center", alignItems: "center" }
});