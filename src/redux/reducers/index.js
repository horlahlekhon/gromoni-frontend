import USER from './UserReducer';
import  BUSINESS from "./BusinessReducer";

// import BUSINESS from './BusinessReducer';
// import MODAL from './ModalReducer';
// import APP_COLOR_MODE from './AppColorMode';
import { combineReducers } from 'redux'
import Common from './common/common'
import Customizer from './Customizer/reducer'

const rootReducers = combineReducers({
  USER,
  BUSINESS,
//   MODAL
    Common,
    Customizer
})

export default rootReducers