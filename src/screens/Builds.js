import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  AsyncStorage,
  TouchableOpacity,
  Image
} from 'react-native';

import Build from '../components/Build'

export default class Builds extends Component {

  constructor() {
    super();
    this.state = {
      builds: '',
      slugApp: '',
      token: '',
      user: ''
    }
  }

  showBuildDetailCallback(slugBuild){
    this.props.navigator.push({
      screen: 'BuildDetail',
      title: 'BuildDetail',
      passProps: {
        slugApp: this.state.slugApp,
        slugBuild : slugBuild
      },
      topTabs: [{
        screenId: 'Log',
        title: 'Log',
        passProps:{
          slugApp: this.state.slugApp,
          slugBuild: slugBuild,
        },
      }, {
        screenId: 'Artifacts',
        title: 'Artifacts & Apps',
        passProps: {
          slugApp: this.state.slugApp,
          slugBuild: slugBuild,
        },
      }],
    });
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
        fetch('https://api.bitrise.io/v0.1/apps/' + this.state.slugApp + '/builds?next=',
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
          <Image source={{uri: this.state.user.avatar_url}} style={styles.foto}/>
          <Text style={styles.title}>Bitrise Companion</Text>
        </View>
        <FlatList style={styles.lista}
          keyExtractor={item => item.slug}
          data={this.state.builds.data}
          renderItem={({ item }) =>
            <Build build={item}
              showBuildDetailCallback={this.showBuildDetailCallback.bind(this)}
               />
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