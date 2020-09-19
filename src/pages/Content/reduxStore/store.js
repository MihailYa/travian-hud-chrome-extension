import { configureStore } from '@reduxjs/toolkit';
import villagesReducer from './villages';

export default configureStore({
  reducer: {
    villages: villagesReducer,
  },
});