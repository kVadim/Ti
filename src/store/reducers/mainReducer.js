import toggleModalSreducer from "./toggleModalSreducer";
import toggleShowListReducer from "./toggleShowListReducer";
import createItemReducer from "./createItemReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import setDoneReducer from "./setDoneReducer";
import { filtersReducer } from "./filtersReducer";
// import { firebaseReducer } from "react-redux-firebase";

const mainReducer = combineReducers({
  filters: filtersReducer,
  items: createItemReducer,
  modalS: toggleModalSreducer,
  showList: toggleShowListReducer,
  firestore: firestoreReducer,
  // firebase: firebaseReducer
  setDoneReducer
});

export default mainReducer;
