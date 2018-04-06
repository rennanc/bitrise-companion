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


export default class Build extends Component {

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

  render() {
    const {build, showBuildDetailCallback} = this.props;

    return (
      <View>
        <TouchableOpacity style={styles.container}
          onPress={() => {showBuildDetailCallback(build.slug)}}>
          <View style={[styles.buildStatus, this.getBuildStatus(build.status)]} />
          <View style={styles.details}>
            <View style={[styles.row, styles.borderDivision]}>
              <Text style={[styles.row_text, styles.branch]}>{build.branch}</Text>
              <Text style={[styles.row_text, styles.workflow]}>{build.triggered_workflow}</Text>
            </View>
            <View style={styles.row}>
              <Text>#{build.build_number} - {build.triggered_at}</Text>
            </View>
            <View style={styles.row}>
              <Text numberOfLines={10} style={styles.commit_message}>{build.commit_message}</Text>
            </View>
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
    //height: 70,
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
  borderDivision:{
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
  },
  row:{
    flex: 1,
    flexDirection: 'row',
  },
  row_text:{
    flex:1,
    fontSize: 12,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    textAlign: 'center',
    marginBottom: 5,
  },
  branch:{
    backgroundColor: '#0C5B4C',
    borderRadius: 6,
    color: 'white',
    marginRight: 5,
  },
  workflow:{
    color: 'black',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#999',
  },
  commit_message:{
    color: 'black'
  }
});
