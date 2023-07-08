import { configureStore } from "@reduxjs/toolkit";
import { campgroundApi } from "./campgroundApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    [campgroundApi.reducerPath]: campgroundApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(campgroundApi.middleware),
});

setupListeners(store.dispatch);
