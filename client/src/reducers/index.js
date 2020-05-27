import {combineReducers} from 'redux';
import alert from './alert';
import login from './login';
import providers from './providers'

export default combineReducers({
    alert,
    login,
    providers
});