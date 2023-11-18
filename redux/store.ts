import { configureStore } from '@reduxjs/toolkit';
import screenReducer from '@/redux/screen';

const store = configureStore({
  reducer: {
    screen: screenReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
