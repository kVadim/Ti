export const createItemActionCreator = (id, newArray) => {
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    const fireStore = getFirestore();
    // const profile = getState().firebase.profile;
    // const authorId = getState().firebase.auth.uid;
    fireStore
      .collection("cats")
      .doc(id)
      .update({
        data: newArray
      })
      .then(() => {
        dispatch({ type: "CREATE_ITEM", newArray });
      })
      .catch(err => {
        dispatch({ type: "CREATE_ITEM_ERROR", err });
      })
  }
}
