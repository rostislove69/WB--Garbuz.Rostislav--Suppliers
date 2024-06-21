import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./slices/modalSlice";
import dateReducer from "./slices/dataSlice";
import sumReducer from "./slices/sumSlice";
import searchReducer from "./slices/searchSlice";
import sortReducer from "./slices/sortSlice";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    data: dateReducer,
    sum: sumReducer,
    search: searchReducer,
    sort: sortReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
