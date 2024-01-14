import { createSlice } from "@reduxjs/toolkit";
const reportSlice = createSlice({
  name: "report",
  initialState: {
    logs: [],
  },
  reducers: {
    addLog: (state, action) => {
      state.logs.push(action.payload);
    },
  },
});
export const { addLog } = reportSlice.actions;
export default reportSlice.reducer;
