import store from "./redux/store/index";
import { showModal } from "./redux/actions/index";
window.store = store;
window.showModal = showModal;