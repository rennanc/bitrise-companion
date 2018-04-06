import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  AsyncStorage,
  FlatList
} from 'react-native';

export default class Log extends Component {

  constructor() {
    super();
    this.state = {
      logs: '',
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
       if (token && this.props.slugApp && this.props.slugBuild) {
         this.setState({token});
         this.setState({ slugApp : this.props.slugApp });
         this.setState({ slugBuild: this.props.slugBuild });
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
          this.setState({ logs: json })
         ).catch(err =>
           console.error('deu ruim')
         )

     })
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <FlatList 
            keyExtractor={item => item.generated_log_chunks_num}
            data={this.state.logs.log_chunks}
            renderItem={({ item }) =>
              <Text style={styles.log_text}>{item.chunk}</Text>
            }
          />
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
    backgroundColor: '#34495e',
  },
  log_text:{
    color: '#fff',
    flex:1
  }
});