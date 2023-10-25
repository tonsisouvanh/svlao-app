import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/auth/AuthSlice";
import studentsReducer from "../feature/student/StudentSlice";
export const store = configureStore({
  reducer: {
    user: authReducer,
    students: studentsReducer,
  },
});

export default store;

// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "../feature/auth/AuthSlice";
// import studentsReducer from "../feature/student/StudentSlice";
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// import { combineReducers } from "redux";

// // Create a root reducer using Redux Toolkit
// const rootReducer = combineReducers({
//   user: authReducer,
//   students: studentsReducer,
// });

// const persistConfig = {
//   key: "root",
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // Create the Redux store
// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// // Create a Redux Persistor
// export const persistor = persistStore(store);
