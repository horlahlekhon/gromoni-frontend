import {combineReducers} from 'redux'
import Common from '../redux/common/common'
import Customizer from './Customizer/reducer'
const reducers = combineReducers({
    Common,
    Customizer
});

export default reducers;