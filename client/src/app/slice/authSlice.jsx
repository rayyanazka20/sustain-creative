import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        user: JSON.parse(localStorage.getItem("user")) || null,
        token: localStorage.getItem("token") || null,
    },
    reducers: {
        login: (state, action) => {
            // Asumsikan payload-nya berbentuk { user: {...}, token: "..." }
            state.user = action.payload.user;
            state.token = action.payload.token;

            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("token", action.payload.token);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;

            localStorage.removeItem("user");
            localStorage.removeItem("token");
        },
    },
});

export const { login, logout } = authSlice.actions;

// Selector untuk mengambil user dari state
export const selectUser = (state) => state.auth.user;

// Selector untuk mengambil token dari state
export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;
