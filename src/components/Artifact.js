import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Image,
    Share,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import RNFetchBlob from 'react-native-fetch-blob';

import BitriseFetchService from '../services/BitriseFetchService'

export default class Artifact extends Component {

    constructor() {
        super();
        this.state = {
          artifact: '',
        }
    }

    componentDidMount() {
        this.getArtifactDetails()
    }

    getArtifactDetails(){
        BitriseFetchService.getArtifactDetails(this.props.slugApp, this.props.slugBuild, this.props.artifact.slug)
            .then(json =>
                this.setState({ artifact: json.data })
            )
            .catch(err =>
                console.error('deu ruim' + err.message)
            )
    }

    downloadFile(artifact) {
        if (artifact) {
            RNFetchBlob
                .config({
                    addAndroidDownloads: {
                        useDownloadManager: true,
                        notification: true,
                        title: artifact.title,
                        mediaScannable: true,
                        mime: 'application/vnd.android.package-archive',
                        description: 'Baixando do bitrise'
                    }
                })
                .fetch('GET', artifact.expiring_download_url)
                .then((resp) => {
                    if (artifact.artifact_type === 'android-apk') {
                        android.actionViewIntent(res.path(), 'application/vnd.android.package-archive')
                    } else {
                        resp.path()
                    }
                })
        }
    }

    shareLink(artifact) {
        Share.share({
            message: 'Baixe o Aplicativo pelo Bitrise ' + artifact.public_install_page_url,
            url: artifact.public_install_page_url,
            title: artifact.title
        }, {
                // Android only:
                dialogTitle: 'Baixar Aplicativo do Bitrise',
                // iOS only:
                excludedActivityTypes: [
                    'com.apple.UIKit.activity.PostToTwitter'
                ]
            })
    }
    
    getArtifactSize(artifact){
        const bytes = this.props.artifact.file_size_bytes;
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }

    getPublicStatus(){
        const publicStatus = this.props.artifact.is_public_page_enabled;
        if(publicStatus){
            return 'lock-open';
        }
        return 'lock-outline';
    }

    

    render() {
        const { artifact } = this.props;

        return (
            <View>
                <View style={styles.details}>
                    <View style={[styles.row, styles.borderDivision]}>
                        <Icon size={30} name={this.getPublicStatus()} color="#aaaaaa"/>
                        <Text style={[styles.row_text, styles.branch]}>{artifact.title}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.row_text}>{this.getArtifactSize()}s</Text>

                        <TouchableOpacity onPress={() => this.downloadFile(this.state.artifact)}>
                            <Icon style={styles.icon} size={15} name="file-download" color="#67c1f5" />
                        </TouchableOpacity>
                        {
                            this.state.artifact.is_public_page_enabled ?
                                <TouchableOpacity onPress={() => this.shareLink(this.state.artifact)}>
                                    <Icon style={styles.icon} size={15} name="share" color="#aaaaaa" />
                                </TouchableOpacity>
                                : null
                        }
                    </View>
                </View>
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
