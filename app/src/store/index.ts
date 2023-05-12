import { configureStore } from "@reduxjs/toolkit";
import nftReducer from "./nft";

const store = configureStore({
  reducer: {
    nft: nftReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
