import rootSlice from "./rootSlice";
import { configureStore } from "@reduxjs/toolkit";



const store = configureStore({
  reducer:{
      root: rootSlice,
  }
});

export default store;
