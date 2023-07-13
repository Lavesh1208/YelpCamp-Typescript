import { configureStore } from "@reduxjs/toolkit";
import { campgroundApi } from "./campgroundApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { reviewApi } from "./reviewApi";

export const store = configureStore({
  reducer: {
    [campgroundApi.reducerPath]: campgroundApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
  },
  middleware: (getDefault) =>
    getDefault().concat([campgroundApi.middleware, reviewApi.middleware]),
});

setupListeners(store.dispatch);
