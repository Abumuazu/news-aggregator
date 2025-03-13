import { createSlice } from '@reduxjs/toolkit';

interface ConnectivityState {
  isOnline: boolean;
}

const initialState: ConnectivityState = {
  isOnline: navigator.onLine,
};

const connectivitySlice = createSlice({
  name: 'connectivity',
  initialState,
  reducers: {
    setOnlineStatus: (state, action) => {
      state.isOnline = action.payload;
    },
  },
});

export const { setOnlineStatus } = connectivitySlice.actions;
export default connectivitySlice.reducer;
