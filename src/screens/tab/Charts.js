import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Dimensions,
    AsyncStorage,
    ActivityIndicator,
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'


import Chart from '../../components/Charts/Chart'

export default class Charts extends Component {

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

    render() {
        return (
            <View style={styles.container}>
                <Chart/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        //marginTop: margin,
        flex: 1,
    }
});
