import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Button,
  Switch,
  AsyncStorage,
  Image
} from 'react-native';

import Loader from '../components/Loader'

import BitriseFetchService from '../services/BitriseFetchService'

export default class Login extends Component {

  constructor() {
    super();
    this.state = {
      token: '',
      switchValue: true,
      mensagem: '',
      loader: '',
    }
  }
  authenticate() {
    if(this.state.token){
      this.setState({loader: true})

      BitriseFetchService.getMe(this.state.token)
        .then(() => {
          this.openHome()
        })
        .catch(err => {
          this.setState({ 
              mensagem: err,
              loader: false
          })
        })
    }else{
      this.setState({loader: false});
      this.setState({ mensagem: 'Type the Token' })
    }
  }

  activeLoader(){
    return this.state.loader ? <Loader /> : null;
  }

  openHome() {
    this.props.navigator.resetTo({
      screen: 'Home',
      title: 'Home',
      navigatorStyle: {
        navBarHidden: true
    }
    });
  }

  clearInput() {
    this.setState({ token: '' });
    this.textInput.clear();
  }

  _handlerToggleSwitch = () => this.setState(state => ({
    switchValue: !state.switchValue
  }))

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.logo} source={require('../resources/img/companion-logo.png')} />
          <Text style={styles.title}>Bitrise Companion</Text>
        </View>
        <View style={styles.block}>
          <Text style={styles.label} >Authentication</Text>
          <TextInput style={styles.input}
            onChangeText={token => this.setState({ token: token })}
            placeholder="Type The Token"
            ref={input => { this.textInput = input }} />
          <Text style={styles.mensagem}>{this.state.mensagem}</Text>
        </View>

        {this.activeLoader()}

        <View style={styles.footer} >
          <View style={styles.footer_Block}>
            <View style={styles.button}>
              <Button 
                color='#8151a8'
                onPress={this.clearInput.bind(this)}
                title="Clear" />
            </View>
            <View style={styles.button}>
              <Button 
                color='#8151a8'
                onPress={this.authenticate.bind(this)}
                title="Login" />
            </View>
          </View>
          <View style={styles.footer_Block}>
           {/*
            <Switch
              onValueChange={this._handlerToggleSwitch}
              value={this.state.switchValue}
            />
            <Text style={styles.switch_label}>Remember Token</Text>*/
           }
          </View>
        </View>
      </View>
    );
  }
}
const width = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3aa792',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1
  },
  block: {
    borderRadius: 4,
    flexDirection: 'column',
    backgroundColor: 'white',
    height: 130,
    width: width - 10
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1
  },
  footer_Block: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  label: {
    textAlignVertical: 'auto',
    color: 'gray',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    textAlignVertical: 'bottom',
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    height: 60,
  },
  button: {
    margin: 5,
    width: 100,
  },
  switch_label: {
    color: 'white'
  },
  mensagem: {
    marginTop: 0,
    color: '#e74c3c'
  },
  logo:{
    width: 100,
    height: 100,
  }
});
