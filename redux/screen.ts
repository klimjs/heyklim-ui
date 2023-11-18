import { createSlice } from '@reduxjs/toolkit';

export const screenSlice = createSlice({
  name: 'screen',
  initialState: {
    currentId: null,
  },
  reducers: {
    setCurrentScreenId: (state, action) => {
      state.currentId = action.payload;
    },
  },
});

export const { setCurrentScreenId } = screenSlice.actions;

export default screenSlice.reducer;
