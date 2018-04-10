import React, { Component } from 'react'
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
} from 'react-native'

import Application from '../components/Application'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { SearchBar } from 'react-native-elements'

export default class Home extends Component {

  constructor() {
    super();
    this.state = {
      apps: [],
      dataSource: '',
      token: '',
      user: '',
      searchText: '',
      loading: true,
      refreshing: false,
    }
  }

  logout() {
    AsyncStorage.clear();
    this.props.navigator.resetTo({
      screen: 'Login',
      title: 'Login',
      navigatorStyle: {
        navBarHidden: true
      }
    });
  }

  showBuildsCallback(slugApp){
    this.props.navigator.push({
      screen: 'Builds',
      title: 'Builds',
      passProps: {
        slugApp : slugApp
      }
    });
  }

  renderHeader = () => {
    return <SearchBar placeholder="busque aqui..."
      onChangeText={(text) => this.filterSearch(text)}
      value={this.state.searchText}
      lightTheme  />
  };

  renderFooter = () => {
    if(!this.state.loading) return null;
    return (
      <View style={{paddingVertical: 20, borderTopWidth:1 ,borderTopColor: '#CED0CE'}}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  handleRefresh = () => {
    this.setState({refreshing: true})
    this.loadApps()
  };

  filterSearch(searchText){
    const newData = this.state.apps.data.filter(function(item) {
      const itemData =  item.title.toUpperCase();
      const textData = searchText.toUpperCase();
      return itemData.indexOf(textData) > -1
    })
    this.setState({
      dataSource: newData,
      searchText: searchText
    })
  }

  loadUser(){
    //load user
    AsyncStorage.getItem('user')
      .then(user => {
        if (user) {
          this.setState({ user: user })
        }
      })
  }

  loadApps(){
    AsyncStorage.getItem('token')
      .then(token => {
        if (token) {
          this.setState({ 
            token, 
            loading: true,
          })
        }
      })
      .then(() => {
        fetch('https://api.bitrise.io/v0.1/me/apps',
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'token ' + this.state.token
            }
          })
          .then(resposta => resposta.json())
          .then(json => {
            this.setState({ 
              apps: json,
              dataSource: json.data,
              loading: false,
              refreshing: false,
            })
          })
          .catch(err => {
            console.error('deu ruim')
            this.setState({ loading: false })
          })

      })
  }

  componentDidMount() {
    this.loadUser()
    this.loadApps()
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={{uri: this.state.user.avatar_url}} style={styles.foto}/>
          <Text style={styles.title}>Bitrise Companion</Text>
          <TouchableOpacity onPressIn={() => this.logout()} style={styles.button_exit}>
            <Icon size={30} name="exit-to-app" color="#fff"/>
          </TouchableOpacity>
        </View>
        <FlatList style={styles.lista}
          keyExtractor={item => item.slug}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
          data={this.state.dataSource}
          renderItem={({ item }) =>
            <Application app={item}
              showBuildsCallback={this.showBuildsCallback.bind(this)} />
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
