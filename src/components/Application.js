import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image
} from 'react-native';


export default class Application extends Component {

  getBuildStatus(buildStatus){
    if(buildStatus === 1){
      return styles.buildStatus_success
    }else if(buildStatus === 2){
      return styles.buildStatus_failed
    }else if(buildStatus === 3){
      return styles.buildStatus_aborted
    }else{
      return styles.buildStatus_progress
    }
  }

  getIcon(tipoProjeto){
    if(tipoProjeto === 'android'){
      return require('../../src/resources/img/ico-android.png');
    }else if(tipoProjeto === 'ios'){
      return require('../../src/resources/img/ico-ios.png');
    }else if(tipoProjeto === 'react-native'){
      return require('../../src/resources/img/ico-react.png');
    }else if(tipoProjeto === 'ionic'){
      return require('../../src/resources/img/ico-ionic.png');
    }else if(tipoProjeto === 'xamarin'){
      return require('../../src/resources/img/ico-xamarin.png');
    }else if(tipoProjeto === 'cordova'){
      return require('../../src/resources/img/ico-cordova.png');
    }

  }

  render() {
    const {app, showBuildsCallback} = this.props;

    return (
      <View key={app.slug}>
        <TouchableOpacity style={styles.container}
          onPress={() => {showBuildsCallback(app)}}>
          <View style={[styles.buildStatus, this.getBuildStatus(app.status)]} />
          <View style={styles.details}>
            <View style={styles.top}>
              <Image style={styles.icone} source={this.getIcon(app.project_type)} />
              <Text style={styles.title}>{app.title}</Text>
            </View>
            <Text>{app.slug}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const width = Dimensions.get('screen').width;
const margem = Platform.OS == 'ios' ? 20 : 0;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    height: 70,
    backgroundColor: '#fff',
    margin:10,
    marginBottom: 10,
    marginTop: 10,
    borderWidth: 0.5,
    borderColor: '#999',
    borderRadius: 6
  },
  buildStatus:{
    width: 10,
    borderRadius: 4
  },
  buildStatus_success:{
    backgroundColor: '#3aa792',
  },
  buildStatus_aborted:{
    backgroundColor: '#ffe00b',
  },
  buildStatus_failed:{
    backgroundColor: '#f0741f',
  },
  buildStatus_progress:{
    backgroundColor: '#8151a8',
  },
  details:{
    flex:1,
    margin:10,
  },
  top:{
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
  },
  icone:{
    width:30,
    height: 30
  },
  title:{
    flex:1,
    fontSize: 19,
    fontWeight: 'bold',
    color: 'black'
  }
});
