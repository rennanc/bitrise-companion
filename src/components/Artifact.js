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


export default class Artifact extends Component {

    getArtifactSize(artifact){
        const bytes = this.props.artifact.file_size_bytes;
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }

    render() {
        const { artifact, showBuildDetailCallback } = this.props;

        return (
            <View>
                <TouchableOpacity style={styles.container}
                    onPress={() => { showBuildDetailCallback(artifact.slug) }}>
                    <View style={styles.details}>
                        <View style={[styles.row, styles.borderDivision]}>
                            <Text style={[styles.row_text, styles.branch]}>{artifact.title}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.row_text}>{this.getArtifactSize()}</Text>
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
        margin: 10,
        marginBottom: 10,
        marginTop: 10,
        borderWidth: 0.5,
        borderColor: '#999',
        borderRadius: 6
    },
    buildStatus: {
        width: 10,
        borderRadius: 4
    },
    details: {
        flex: 1,
        margin: 10,
    },
    borderDivision: {
        borderBottomColor: '#bbb',
        borderBottomWidth: 1,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
    },
    row_text: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        textAlignVertical: 'center',
        textAlign: 'center',
        marginBottom: 5,
    },
    branch: {
        backgroundColor: '#0C5B4C',
        borderRadius: 6,
        color: 'white',
        marginRight: 5,
    },
    workflow: {
        color: 'black',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#999',
    },
    commit_message: {
        color: 'black'
    }
});
