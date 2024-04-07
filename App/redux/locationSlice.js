// locationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const locationSlice = createSlice({
  name: 'location',
  initialState: { latitude: null, longitude: null },
  reducers: {
    setLocationValue(state, action) {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
  },
});

export const { setLocationValue } = locationSlice.actions;
export default locationSlice.reducer;
