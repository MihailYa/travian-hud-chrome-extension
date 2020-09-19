import { createSlice } from '@reduxjs/toolkit';

export const villagesSlice = createSlice({
  name: 'villages',
  initialState: {
    activeVillageIndex: -1,
    villagesList: [],
  },
  reducers: {
    setVillages: (state, action) => {
      return action.payload;
    },
  },
});

export const { setVillages } = villagesSlice.actions;

export default villagesSlice.reducer;