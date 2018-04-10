//import { AppRegistry } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { AsyncStorage } from 'react-native'
import Home from './src/screens/Home'
import Login from './src/screens/Login'
import Builds from './src/screens/Builds'
import BuildDetail from './src/screens/BuildDetail'
import Artifacts from './src/screens/tab/Artifacts'
import Log from './src/screens/tab/Log'
import Artifact from './src/components/Artifact';
import ArtifactDetail from './src/screens/modal/ArtifactDetail'

Navigation.registerComponent('Login', () => Login);
Navigation.registerComponent('Home', () => Home);
Navigation.registerComponent('Builds', () => Builds);
Navigation.registerComponent('BuildDetail', () => BuildDetail);
Navigation.registerComponent('Log', () => Log);
Navigation.registerComponent('Artifacts', () => Artifacts);
Navigation.registerComponent('Artifact', () => Artifact);
Navigation.registerComponent('ArtifactDetail', () => ArtifactDetail);

AsyncStorage.getItem('token')
    .then(token => {
        if (token) {
            return {
                screen: 'Home',
                title: 'Home',
                navigatorStyle: {
                    navBarHidden: true
                }
            }
        }

        return {
            screen: 'Login',
            title: 'Login',
            navigatorStyle: {
                navBarHidden: true
            }
        }
    })
    .then(screen => Navigation.startSingleScreenApp({ screen }));



