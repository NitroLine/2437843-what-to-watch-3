import {configureStore} from '@reduxjs/toolkit';
import {reducer} from './reducers/reducer';
import {createAPI} from './api/api';

export const api = createAPI();
export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>;
