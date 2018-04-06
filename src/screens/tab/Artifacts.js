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

import Artifact from '../../components/Artifact'

export default class Artifacts extends Component {

  constructor() {
    super();
    this.state = {
      artifacts: '',
      slugApp: '',
      slugBuild: '',
      token: '',
      user: ''
    }
  }

  componentDidMount() {

     AsyncStorage.getItem('token')
     .then(token => {
       if (token && this.props.slugApp) {
         this.setState({ token });
         this.setState({ slugApp: this.props.slugApp });
         this.setState({ slugBuild: this.props.slugBuild });
       }
     })
     .then(() => {
       fetch('https://api.bitrise.io/v0.1/apps/' + this.state.slugApp + '/builds/' + this.state.slugBuild + '/artifacts',
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
           this.setState({ artifacts: json })
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
            keyExtractor={item => item.slug}
            data={this.state.artifacts.data}
            renderItem={({ item }) =>
              <Artifact artifact={item}/>
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
  },
});