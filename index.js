//import { AppRegistry } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { AsyncStorage } from 'react-native'
import Home from './src/screens/Home'
import Aplicacao from './src/components/Aplicacao'
import Login from './src/screens/Login'
import Dashboard from './src/screens/Dashboard'

Navigation.registerComponent('Login', () => Login);
Navigation.registerComponent('Aplicacao', () => Aplicacao);
Navigation.registerComponent('Home', () => Home);
Navigation.registerComponent('Dashboard', () => Dashboard);

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



