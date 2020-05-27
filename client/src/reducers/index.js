import {combineReducers} from 'redux';
import alert from './alert';
import login from './login';
import inserts from './inserts'

export default combineReducers({
    alert,
    login,
    inserts
});