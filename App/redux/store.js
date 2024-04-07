// store.js
import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import locationReducer from './locationSlice'; // Import your locationSlice reducer
import authReducer from "./authSlice";

const rootReducer = combineReducers({
  location: locationReducer, // Add your locationSlice reducer to the root reducer
  auth: authReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
});

export default store;