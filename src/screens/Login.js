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
  AsyncStorage
} from 'react-native';

export default class Login extends Component {

  constructor() {
    super();
    this.state = {
      token: '',
      switchValue: true,
      mensagem: ''
    }
  }
  authenticate() {
    fetch('https://api.bitrise.io/v0.1/me/',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'token ' + this.state.token
        }
      }).then(resposta => resposta.json())
      .then(json => {
        AsyncStorage.setItem('token', this.state.token)
        AsyncStorage.setItem('user', json.data)
        this.openHome()
      }).catch(err =>
        this.setState({ mensagem: err.message })
      )
  }

  openHome() {
    this.props.navigator.resetTo({
      screen: 'Home',
      title: 'Home'
    });
  }

  clearInput() {
    this.setState({ token: '' })
  }

  _handlerToggleSwitch = () => this.setState(state => ({
    switchValue: !state.switchValue
  }))

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Bitrise Companion</Text>
        </View>
        <View style={styles.block}>
          <Text style={styles.label} >Autenticação</Text>
          <TextInput style={styles.input}
            onChangeText={token => this.setState({ token: token })}
            placeholder="Adicione o Token" />
          <Text style={styles.mensagem}>{this.state.mensagem}</Text>
        </View>
        <View style={styles.footer} >
          <View style={styles.footer_Block}>
            <Button style={styles.button}
              onPress={this.clearInput.bind(this)}
              title="Limpar" />
            <Button style={styles.button}
              onPress={this.authenticate.bind(this)}
              title="Entrar" />
          </View>
          <View style={styles.footer_Block}>
            <Switch
              onValueChange={this._handlerToggleSwitch}
              value={this.state.switchValue}
            />
            <Text style={styles.switch_label}>Gravar Token</Text>
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
    margin: 80,
    marginLeft: 30,
    height: 30
  },
  switch_label: {
    color: 'white'
  },
  mensagem: {
    marginTop: 0,
    color: '#e74c3c'
  }
});
