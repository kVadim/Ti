const initialState = { listAll: { currentCatNameIndex: 0 } };

export const filtersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LIST_ALL_INCREASE_CAT_NAME_INDEX': console.log('LIST_ALL_INCREASE_CAT_NAME_INDEX');
            return { listAll: { currentCatNameIndex: state.listAll.currentCatNameIndex + 1 } };
        case 'LIST_ALL_DECREASE_CAT_NAME_INDEX': console.log('LIST_ALL_DECREASE_CAT_NAME_INDEX');
            return { listAll: { currentCatNameIndex: state.listAll.currentCatNameIndex - 1 } };
        case 'LIST_ALL_DECREASE_CAT_NAME_INDEX_ERROR': console.log('LIST_ALL_DECREASE_CAT_NAME_INDEX_ERROR', action.err);
            return state;
        default: return state;
    }
}