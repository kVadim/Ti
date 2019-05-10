const initialState = {
  showList: true
};

const toggleShowListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_SHOW_LIST":
      return { ...state, showList: !state.showList };
    default:
      return state;
  }
};

export default toggleShowListReducer;
