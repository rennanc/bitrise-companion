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

import BitriseFetchService from '../../services/BitriseFetchService'

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

    this.setState({ loading: true })
    BitriseFetchService.getArtifacts(this.props.slugApp, this.props.slugBuild)
      .then(json =>
        this.setState({
          artifacts: json,
          loading: false,
          refreshing: false,
        })
      ).catch(err =>
        console.error('deu ruim')
      )
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
                key={item.slug}
                artifact={item}
                slugApp={this.props.slugApp}
                slugBuild={this.props.slugBuild}/>
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