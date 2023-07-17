import { configureStore } from "@reduxjs/toolkit";
import { campgroundApi } from "./campgroundApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { reviewApi } from "./reviewApi";
import { userApi } from "./userApi";
import globalReducer from "./global";

export const store = configureStore({
  reducer: {
    global: globalReducer,
    [campgroundApi.reducerPath]: campgroundApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefault) =>
    getDefault().concat([
      campgroundApi.middleware,
      reviewApi.middleware,
      userApi.middleware,
    ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
