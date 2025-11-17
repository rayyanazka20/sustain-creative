import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        user: null,
        token: null,
        lastLogin: null,
    },
    reducers: {
        login: (state, action) => {
            const { user, token,lastLogin } = action.payload;

            state.user = user;
            state.token = token;
            state.lastLogin = lastLogin;

            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
            localStorage.setItem("lastLogin", lastLogin);
        },

        logout: (state) => {
            state.user = null;
            state.token = null;
            state.lastLogin = null;

            localStorage.removeItem("user");
            localStorage.removeItem("token");
            localStorage.removeItem("lastLogin");

        },
    },
});

export const { login, logout } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectLastLogin = (state) => state.auth.lastLogin;

export default authSlice.reducer;
