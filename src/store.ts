import { configureStore } from '@reduxjs/toolkit';
import connectivityReducer from './features/connectivitySlice';
import preferencesReducer from './features/preferencesSlice';

export const store = configureStore({
  reducer: {
    connectivity: connectivityReducer,
    preferences: preferencesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
