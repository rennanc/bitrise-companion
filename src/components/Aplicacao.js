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


export default class Aplicacao extends Component {

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
      return require('../../resources/img/ico-android.png');
    }else if(tipoProjeto === 'ios'){
      return require('../../resources/img/ico-ios.png');
    }else if(tipoProjeto === 'react-native'){
      return require('../../resources/img/ico-react.png');
    }else if(tipoProjeto === 'ionic'){
      return require('../../resources/img/ico-ionic.png');
    }else if(tipoProjeto === 'xamarin'){
      return require('../../resources/img/ico-xamarin.png');
    }else if(tipoProjeto === 'cordova'){
      return require('../../resources/img/ico-cordova.png');
    }

  }

  render() {
    const {build} = this.props;

    return (
      <View>
        <TouchableOpacity  style={styles.container}>
          <View style={[styles.buildStatus, this.getBuildStatus(build.status)]} />
          <View style={styles.details}>
            <View style={styles.top}>
              <Image style={styles.icone} source={this.getIcon(build.project_type)} />
              <Text style={styles.title}>{build.title}</Text>
            </View>
            <Text>{build.slug}</Text>
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
    backgroundColor: '#d7d7d7',
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
