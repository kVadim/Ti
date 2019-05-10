export const resetActionCreator = (id, newArray) => {
  console.warn(id, newArray);

  return (dispatch, getState, { getFirestore }) => {
    const fireStore = getFirestore();
    fireStore
      .collection('cats')
      .doc(id)
      .update({
        data: newArray
      })
      .then(() => {
        dispatch({ type: "RESET", id });
      })
      .catch(err => {
        dispatch({ type: "RESET_ERROR", err });
      });
  };
};
