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

import Artifact from '../../components/Artifact'

export default class Artifacts extends Component {

  constructor() {
    super();
    this.state = {
      artifacts: '',
      slugApp: '',
      slugBuild: '',
      token: '',
      user: '',
      loading: true,
      refreshing: false,
    }
  }

  showArtifactDetailCallback(slugArtifact){
    this.props.navigator.showLightBox({
      screen: 'ArtifactDetail',
      passProps: {
        slugApp: this.state.slugApp,
        slugBuild: this.state.slugBuild,
        slugArtifact: slugArtifact,
      },
      style: {
        backgroundBlur: "dark",
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        tapBackgroundToDismiss: true,
      },
      animationType: 'slide-up',
    });
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
    this.loadArtifacts()
  };

  loadArtifacts(){
    AsyncStorage.getItem('token')
      .then(token => {
        if (token && this.props.slugApp) {
          this.setState({ 
            token,
            slugApp: this.props.slugApp,
            slugBuild: this.props.slugBuild,
            loading: true,
          });
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
            this.setState({ 
              artifacts: json,
              loading: false,
              refreshing: false,
            })
          ).catch(err =>
            console.error('deu ruim')
          )

      })
  }

  componentDidMount() {
    this.loadArtifacts()
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <FlatList
            keyExtractor={item => item.slug}
            ListFooterComponent={this.renderFooter}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            data={this.state.artifacts.data}
            renderItem={({ item }) =>
              <Artifact 
                showArtifactDetailCallback={this.showArtifactDetailCallback.bind(this)}
                artifact={item}/>
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