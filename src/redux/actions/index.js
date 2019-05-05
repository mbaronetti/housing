// src/js/actions/index.js
import { SHOW_MODAL , SET_DATA , SET_IMAGES} from '../Constants';

export const showModal = value => {
    return {
        type: SHOW_MODAL,
        value
    }
}

export const setData = data => {
    return{
        type: SET_DATA,
        data
    }
}

export const setHouseImages = data => {
    return{
        type: SET_IMAGES,
        data
    }
}