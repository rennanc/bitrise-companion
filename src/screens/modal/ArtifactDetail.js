import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  AsyncStorage,
} from 'react-native';

export default class ArtifactDetail extends Component {

  constructor() {
    super();
    this.state = {
      artifact: '',
      slugArtifact: '',
      slugApp: '',
      slugBuild: '',
      token: '',
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('token')
     .then(token => {
       if (token && this.props.slugApp && this.props.slugBuild && this.props.slugArtifact) {
         this.setState({ token });
         this.setState({ slugApp: this.props.slugApp });
         this.setState({ slugBuild: this.props.slugBuild });
         this.setState({ slugArtifact: this.props.slugArtifact });
       }
     })
     .then(() => {
       fetch('https://api.bitrise.io/v0.1/apps/' + this.state.slugApp + '/builds/' + this.state.slugBuild + '/artifacts/' + this.state.slugArtifact,
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
            this.setState({ artifact: json.data })
         ).catch(err =>
            console.error('deu ruim')
         )

     })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.artifact.public_install_page_url}</Text>
      </View>
    );
  }
}

const width = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').height * 0.3,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 16,
  },
});