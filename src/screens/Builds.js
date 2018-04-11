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
  Image,
  ActivityIndicator,
} from 'react-native';

import Build from '../components/Build'

import BitriseFetchService from '../services/BitriseFetchService'

export default class Builds extends Component {

  constructor() {
    super();
    this.state = {
      builds: '',
      slugApp: '',
      token: '',
      user: '',
      loading: true,
      refreshing: false,
    }
  }

  showBuildDetailCallback(build){    
    this.props.navigator.push({
      screen: 'BuildDetail',
      title: 'Details of Build #' + build.build_number,
      passProps: {
        slugApp: this.state.slugApp,
        slugBuild: build.slug
      },
      navigatorStyle: {
        navBarBackgroundColor: '#3aa792',
        navBarTextColor: '#fff',
        navBarButtonColor: '#fff',
      },
      topTabs: [{
        screenId: 'Log',
        title: 'Log',
        passProps:{
          slugApp: this.state.slugApp,
          slugBuild: build.slug,
        },
      }, {
        screenId: 'Artifacts',
        title: 'Artifacts & Apps',
        passProps: {
          slugApp: this.state.slugApp,
          slugBuild: build.slug,
        },
      }],
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
    this.loadBuilds()
  };

  loadBuilds(){
    this.setState({slugApp: this.props.slugApp})
    BitriseFetchService.getBuilds(this.props.slugApp)
      .then(json =>
        this.setState({
          builds: json,
          loading: false,
          refreshing: false,
        })
      )
      .catch(err => {
        console.error('deu ruim')
        this.setState({ loading: false })
      })
  }

  componentDidMount() {
    this.loadBuilds()
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList style={styles.lista}
          keyExtractor={item => item.slug}
          ListFooterComponent={this.renderFooter}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
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