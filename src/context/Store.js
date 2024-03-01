import { configureStore } from "@reduxjs/toolkit";
import { UserSlice } from "./Slices";

export const Store = configureStore({ reducer: { user: UserSlice.reducer } });
