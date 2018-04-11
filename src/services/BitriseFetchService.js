import { AsyncStorage } from 'react-native';
import React, { Component } from 'react'

const bitriseApiAddress = 'https://api.bitrise.io/v0.1/'

export default class BitriseFetchService{

    static loadApps() {
        
        return AsyncStorage.getItem('token')
            .then(token => {
                return {
                    method: 'GET',
                    headers: new Headers({
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'token ' + token,
                    })
                }
            })
            .then(requestInfo => fetch(bitriseApiAddress + 'me/apps',requestInfo))
            .then(resposta => {
                if (resposta.ok)
                    return resposta.json()
                throw new Error('Ocorreu um problema ao obter os dados')
            })
    }
}