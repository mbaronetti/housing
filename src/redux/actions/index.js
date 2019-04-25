// src/js/actions/index.js
import { SHOW_MODAL } from '../Constants';

export const showModal = payload => {
    return {
        type: SHOW_MODAL,
        payload
    }
}