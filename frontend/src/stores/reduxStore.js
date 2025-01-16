import { configureStore } from '@reduxjs/toolkit';
import chatReducer from '../utils/reducers'; // Your chat reducer

const store = configureStore({
  reducer: chatReducer,
});

export default store;