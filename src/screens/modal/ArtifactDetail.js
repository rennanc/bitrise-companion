import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

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
        <TouchableOpacity style={styles.details}>
          <Icon style={styles.icon} size={120} name="file-download" color="#67c1f5"/>
          <Text style={styles.row_text}>{this.state.artifact.title}</Text>
        </TouchableOpacity>
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
    padding: 5,
  },
  details:{
    flex:1,
    margin:5,
  },
  icon:{
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  row_text:{
    flex:1,
    fontSize: 16,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    textAlign: 'center',
    marginBottom: 5,
  },
});