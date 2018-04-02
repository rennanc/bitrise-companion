//import { AppRegistry } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { AsyncStorage} from 'react-native'
import Home from './src/screens/Home'
import Aplicacao from './src/components/Aplicacao'
import Login from './src/screens/Login'

Navigation.registerComponent('Login', () => Login);
Navigation.registerComponent('Aplicacao', () => Aplicacao);
Navigation.registerComponent('Home', () => Home);

AsyncStorage.getItem('token')
    .then(token => {
        if(token){
            return{
                screen: 'Home',
                title: 'Home'
            }
        }

        return{
            screen: 'Login',
            title: 'Login'
        }
    })
    .then(screen => Navigation.startSingleScreenApp({screen}));



