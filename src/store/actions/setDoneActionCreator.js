export const setDoneActionCreator = (id, newArray) => {
  console.warn(id, newArray);

  return (dispatch, getState, { getFirestore, getFireBase }) => {
    const fireStore = getFirestore();
    fireStore
      .collection('cats')
      .doc(id)
      .update({
        data: newArray
      })
      .then(() => {
        dispatch({ type: "SET_ITEM_DONE", id });
      })
      .catch(err => {
        dispatch({ type: "SET_ITEM_DONE_ERROR", err });
      });
  };
};
