import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  AsyncStorage,
  FlatList,
  ActivityIndicator,
} from 'react-native';

export default class Log extends Component {

  constructor() {
    super();
    this.state = {
      logs: '',
      slugApp: '',
      slugBuild: '',
      token: '',
      user: '',
      loading: true,
      refreshing: false,
    }
  }

  renderFooter = () => {
    if (!this.state.loading) return null;
    return (
      <View style={{ paddingVertical: 20, borderTopWidth: 1, borderTopColor: '#CED0CE' }}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  handleRefresh = () => {
    this.setState({ refreshing: true })
    this.loadLogs()
  };

  loadLogs(){
    AsyncStorage.getItem('token')
      .then(token => {
        if (token && this.props.slugApp && this.props.slugBuild) {
          this.setState({ 
            token,
            slugApp: this.props.slugApp,
            slugBuild: this.props.slugBuild,
            loading: true,
          });
        }
      })
      .then(() => {
        fetch('https://api.bitrise.io/v0.1/apps/' + this.state.slugApp + '/builds/' + this.state.slugBuild + '/log',
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
            this.setState({ 
              logs: json,
              loading: false,
              refreshing: false,
            })
          ).catch(err =>
            console.error('deu ruim')
          )

      })
  }

  componentDidMount() {
    this.loadLogs()
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList 
          keyExtractor={item => item.generated_log_chunks_num}
          ListFooterComponent={this.renderFooter}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
          data={this.state.logs.log_chunks}
          renderItem={({ item }) =>
            <Text style={styles.log_text}>{item.chunk}</Text>
          }
        />
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
    backgroundColor: '#34495e',
  },
  log_text:{
    color: '#fff',
    flex:1
  }
});