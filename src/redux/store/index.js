// src/js/store/index.js

import { createStore } from "redux";
//import thunk from 'redux-thunk';
import rootReducer from "../reducers/index";

const store = createStore(rootReducer);

export default store;