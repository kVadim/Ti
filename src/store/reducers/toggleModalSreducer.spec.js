import toggleModalSReducer from "./toggleModalSReducer";

describe("reducers", () => {
  describe("counter", () => {
    it("should provide the initial state", () => {
      expect(toggleModalSReducer(undefined, {})).toEqual({ modalS: false });
    });

    it("should handle TOGGLE_MODAL action", () => {
      expect(
        toggleModalSReducer({ modalS: false }, { type: "TOGGLE_MODAL" }).modalS
      ).toEqual(true);
      expect(
        toggleModalSReducer({ modalS: true }, { type: "TOGGLE_MODAL" }).modalS
      ).toEqual(false);
    });
  });
});

// describe("reducers", () => {
//   describe("counter", () => {
//     it("should provide the initial state", () => {
//       expect(modalSReducer(undefined, {})).toEqual({ modalS: false });
//     });

//     it("should handle OPEN_MODAL action", () => {
//       expect(modalSReducer({ modalS: false }, { type: "OPEN_MODAL" })).toEqual({
//         modalS: true
//       });
//     });

//     it("should handle CLOSE_MODAL action", () => {
//       expect(modalSReducer({ modalS: false }, { type: "DECREMENT" })).toEqual({
//         modalS: false
//       });
//     });

//     it("should ignore unknown actions", () => {
//       expect(modalSReducer({ modalS: false }, { type: "unknown" })).toEqual({
//         modalS: false
//       });
//     });
//   });
// });
