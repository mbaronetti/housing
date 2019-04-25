// src/js/reducers/index.js
import { SHOW_MODAL } from '../Constants';

const initialState = {
  modalVisible: false
};

function rootReducer(state = initialState, action) {
    
    if(action.type === SHOW_MODAL){
        let newState;
        newState = {...state, modalVisible: action.payload}
        return newState;
    }
  return state;
    
};

export default rootReducer;