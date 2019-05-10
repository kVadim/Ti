const initialState = {
  modalS: false
};

const toggleModalSreducer = (state = initialState, action) => {
  // if (!action.type.includes("@@")) console.table(action);

  switch (action.type) {
    case "TOGGLE_MODAL":
      return console.log("blah") || { ...state, modalS: !state.modalS };
    default:
      return state;
  }
};

export default toggleModalSreducer;
