import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers/index.js";
const store = configureStore({
	reducer: reducers,
});
export default store;
