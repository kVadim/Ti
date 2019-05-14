const initialState = {
	listAll : {},
	app     : {
		currentCatNameIndex : 0,
		currentCatItemIndex : 0
	}
};

export const filtersReducer = (state = initialState, action) => {
	switch (action.type) {
		// currentCatNameIndex
		case 'APP_INCREASE_CAT_NAME_INDEX':
			console.log('APP_INCREASE_CAT_NAME_INDEX');
			return { app: { currentCatNameIndex: state.app.currentCatNameIndex + 1 } };
		case 'APP_DECREASE_CAT_NAME_INDEX':
			console.log('APP_DECREASE_CAT_NAME_INDEX');
			return { app: { currentCatNameIndex: state.app.currentCatNameIndex - 1 } };
		case 'APP_DECREASE_CAT_NAME_INDEX_ERROR':
			console.log('APP_DECREASE_CAT_NAME_INDEX_ERROR', action.err);
			return state;

		// currentCatItemIndex
		case 'APP_INCREASE_CAT_ITEM_INDEX':
			console.log('APP_INCREASE_CAT_ITEM_INDEX');
			return { app: { currentCatItemIndex: state.app.currentCatItemIndex + 1 } };
		case 'APP_DECREASE_CAT_ITEM_INDEX':
			console.log('APP_DECREASE_CAT_ITEM_INDEX');
			return { app: { currentCatItemIndex: state.app.currentCatItemIndex - 1 } };
		case 'APP_DECREASE_CAT_ITEM_INDEX_ERROR':
			console.log('APP_DECREASE_CAT_ITEM_INDEX_ERROR', action.err);
			return state;
		default:
			return state;
	}
};
