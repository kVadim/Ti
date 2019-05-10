const initialState = { solved: false };

const setDoneReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ITEM_DONE': console.log('SET_ITEM_DONE_REDUCER');
            return state;
        case 'SET_ITEM_DONE_ERROR': console.log('SET_ITEM_DONE_REDUCER_ERROR', action.err);
            return state;
        default: return state;
    }
}
export default setDoneReducer