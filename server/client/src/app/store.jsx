import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice.jsx";
import portfolioReducer from "./slice/portofolioSlice.jsx";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        portfolio: portfolioReducer,
    },
});
