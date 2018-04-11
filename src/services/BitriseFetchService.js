import { AsyncStorage } from 'react-native';
import React, { Component } from 'react'

const bitriseApiAddress = 'https://api.bitrise.io/v0.1/'

export default class BitriseFetchService{

    static getHeader(token){
        return {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'token ' + token,
        }
    }

    static getMe(token){

        return fetch('https://api.bitrise.io/v0.1/me/',
            {
                method: 'GET',
                headers: new Headers(this.getHeader(token))
            })
            .then(response => {
                if (response.ok)
                    return response.json()
                throw new Error('Ocorreu um problema ao obter os dados')
            })
            .then(json => {
                AsyncStorage.setItem('token', token)
                AsyncStorage.setItem('user', json.data)
                return json
            })
    }

    static getApps() {
        return AsyncStorage.getItem('token')
            .then(token => {
                return {
                    method: 'GET',
                    headers: new Headers(this.getHeader(token))
                }
            })
            .then(requestInfo => fetch(bitriseApiAddress + 'me/apps',requestInfo))
            .then(response => {
                if (response.ok)
                    return response.json()
                throw new Error('Ocorreu um problema ao obter os dados')
            })
    }

    static getBuilds(slugApp){
        return AsyncStorage.getItem('token')
            .then(token => {
                return {
                    method: 'GET',
                    headers: new Headers(this.getHeader(token))
                }
            })
            .then(requestInfo => fetch(bitriseApiAddress + 'apps/' + slugApp + '/builds?next=', requestInfo))
            .then(response => {
                if (response.ok)
                    return response.json()
                throw new Error('Ocorreu um problema ao obter os dados')
            })
    }

    static getBuildDetails(slugApp, slugBuild){
        return AsyncStorage.getItem('token')
            .then(token => {
                return {
                    method: 'GET',
                    headers: new Headers(this.getHeader(token))
                }
            })
            .then(requestInfo => fetch('https://api.bitrise.io/v0.1/apps/' + slugApp + '/builds/' + slugBuild, requestInfo))
            .then(response => {
                if (response.ok)
                    return response.json()
                throw new Error('Ocorreu um problema ao obter os dados')
            })
    }
}