const initialState = {
  items: [
    {
      id: 1,
      riddle: "ты же это не серьезно",
      answer: "you can not be serious"
    }]
};

const createItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_ITEM":
      console.log("CREATE_ITEM");
      return state;
    case "CREATE_ITEM_ERROR":
      console.log("CREATE_ITEM_ERROR", action.err);
      return state;
    default:
      return state;
  }
};
export default createItemReducer;
