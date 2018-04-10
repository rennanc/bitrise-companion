import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator
} from 'react-native';

export default class Loader extends Component {

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating size="large" />
        <Text>Carregando...</Text>
      </View>
    );
  }
}

const width = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 100,
    height: 80,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
