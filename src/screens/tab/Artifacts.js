import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  AsyncStorage
} from 'react-native';

export default class Artifacts extends Component {

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
     //load token
     AsyncStorage.getItem('token')
     .then(token => {
       if (token && this.props.slugApp) {
         this.setState({token})
         this.setState({slugApp : this.props.slugApp})
       }
     })
     .then(() => {
       fetch('https://api.bitrise.io/v0.1/apps/' + this.state.slugApp + '/builds/' + this.state.slugBuild,
         {
           method: 'GET',
           headers: {
             Accept: 'application/json',
             'Content-Type': 'application/json',
             'Authorization': 'token ' + this.state.token
           }
         })
         .then(resposta => resposta.json())
         .then(json =>
           this.setState({ builds: json })
         ).catch(err =>
           console.error('deu ruim')
         )

     })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Bitrise Companion</Text>
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