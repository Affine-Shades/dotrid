import { configureStore } from "@reduxjs/toolkit";
import sizeReducer from "./slices/sizeSlice";
import colourReducer from "./slices/colourSlice";
import menuReducer from "./slices/menuSlice";

export const store = configureStore({
  reducer: {
    size: sizeReducer,
    colour: colourReducer,
    menu: menuReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
