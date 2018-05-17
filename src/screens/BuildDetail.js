import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  AsyncStorage
} from 'react-native';

import BitriseFetchService from '../services/BitriseFetchService'

export default class BuildDetail extends Component {

  constructor() {
    super();
    this.state = {
      builds: '',
      slugApp: '',
      slugBuild: '',
      token: '',
      user: ''
    }
  }

  componentDidMount() {
    BitriseFetchService.getBuildDetails(this.props.slugApp, this.state.slugBuild)
      .then(json =>
        this.setState({ builds: json })
      )
      .catch(err =>
        console.error('deu ruim')
      )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Bitrise Companion</Text>
        </View>
        <View>
          <Text>Logs</Text>
        </View>
        <View>
          <Text>Apps & Artifacts</Text>
        </View>
      </View>
    );
  }
}

const width = Dimensions.get('screen').width;
const margin = Platform.OS == 'ios' ? 20 : 0;

const styles = StyleSheet.create({
  container: {
    marginTop: margin,
    flex: 1,
  },
  header: {
    height: 50,
    backgroundColor: '#3aa792',
    flexDirection: 'row'
  },
  button_exit:{
    marginRight: 5,
    justifyContent: 'center',
  },
  title: {
    flex:1,
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    textAlign: 'center'
  }
});