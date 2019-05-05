// src/js/reducers/index.js
import { SHOW_MODAL , SET_DATA , SET_IMAGES} from '../Constants';


function rootReducer(state = {}, action) {
    
    if(action.type === SHOW_MODAL){
        return {...state, modalVisible: action.value}
    }
    
    if(action.type === SET_DATA){
        return {...state , data: action.data}
    }
    
    if(action.type === SET_IMAGES){
        return {...state , houseImages: action.data.houseImages , carouselImages: action.data.carouselImages}
    }
    
  return state;
    
};

export default rootReducer;