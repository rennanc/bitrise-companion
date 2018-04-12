import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Dimensions
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner'

export default class ScannerToken extends Component {

    onSuccess(e) {
        this.props.navigator.resetTo({
            screen: 'Login',
            title: 'Login',
            passProps: {
                token: e.data
            },
            navigatorStyle: {
                navBarHidden: true
            }
        })
        this.props.navigator.dismissLightBox()
    }

    render() {
        return (
            <View style={styles.container}>
                <QRCodeScanner
                    style={styles.qrCodeBox}
                    onRead={this.onSuccess.bind(this)}
                />
            </View>
        );
    }
}
const width = Dimensions.get('screen').width;

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').height * 0.4,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        padding: 5,
    },
});
