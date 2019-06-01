import { Navigation } from 'react-native-navigation'
import { AsyncStorage } from 'react-native'
import Home from './src/screens/Home'
import Login from './src/screens/Login'
import Builds from './src/screens/Builds'
import BuildDetail from './src/screens/BuildDetail'
import Artifacts from './src/screens/tab/Artifacts'
import Log from './src/screens/tab/Log'
import Artifact from './src/components/Artifact';
import ScannerToken from './src/screens/modal/ScannerToken'

Navigation.registerComponent('Login', () => Login)
Navigation.registerComponent('Home', () => Home)
Navigation.registerComponent('Builds', () => Builds)
Navigation.registerComponent('BuildDetail', () => BuildDetail)
Navigation.registerComponent('Log', () => Log)
Navigation.registerComponent('Artifacts', () => Artifacts)
Navigation.registerComponent('Artifact', () => Artifact)
Navigation.registerComponent('ScannerToken', () => ScannerToken)


Navigation.setDefaultOptions({
  topBar: {
    title: {
      color: '#fff',
    },
    background: {
      color: '#3aa792'
    },
    backButton: {
      color: '#fff'
    }
  },
  statusBar : {
    visible: true,
     style: 'light',
     backgroundColor: '#3aa792'
  }
})

AsyncStorage.getItem('token')
    .then(token => {
        if (token) {
            return {
                name: 'Home',
                options: {
                    topBar: {
                        title: {
                            text: 'Home'
                        },
                        visible: false,
                        height: 0
                    }
                },
            }
        }

        return {
            name: 'Login',
            options: {
                topBar: {
                    title: {
                        text: 'Login'
                    },
                    visible: false,
                    height: 0
                }
            },
        }
    })
    .then(screen => {
        Navigation.setRoot({
            root: {
              stack: {
                id: screen.name,
                options: {},
                children: [
                  {
                    component: screen
                  }
                ]
              }
            }
          });
      })
    .then(screen => Navigation.startSingleScreenApp({ screen }))



