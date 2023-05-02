import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  info: {
    type: ""
  }
};
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      state.message = action.payload.message;
      state.info.type = action.payload.info;
    },
    removeNotification(state, action) {
      return initialState;
    },
  }
});
export default notificationSlice.reducer;
export const { setNotification, removeNotification } = notificationSlice.actions;

export const notificationSetter = (message, info) => {
  return async dispatch => {
    dispatch(setNotification(message, info));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 3000);
  };

};