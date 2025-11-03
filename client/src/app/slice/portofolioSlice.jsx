import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "/src/api/axios.jsx";

// ✅ Ambil semua portfolio
export const fetchPortfolios = createAsyncThunk(
    "portfolio/fetchPortfolios",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get("/portfolio");
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data);
        }
    }
);

// ✅ Tambah portfolio
export const addPortfolio = createAsyncThunk(
    "portfolio/addPortfolio",
    async (portfolioData, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            for (const key in portfolioData) {
                formData.append(key, portfolioData[key]);
            }
            const res = await axiosInstance.post("/portfolio", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data);
        }
    }
);

// ✅ Edit portfolio
export const editPortfolio = createAsyncThunk(
    "portfolio/editPortfolio",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            for (const key in data) {
                formData.append(key, data[key]);
            }
            const res = await axiosInstance.put(`/portfolio/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data);
        }
    }
);

// ✅ Delete portfolio
export const deletePortfolio = createAsyncThunk(
    "portfolio/deletePortfolio",
    async (id, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`/portfolio/${id}`);
            return id;
        } catch (err) {
            return rejectWithValue(err.response?.data);
        }
    }
);

const portfolioSlice = createSlice({
    name: "portfolio",
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // 🔹 Fetch
            .addCase(fetchPortfolios.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPortfolios.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchPortfolios.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to fetch portfolios";
            })
            // 🔹 Add
            .addCase(addPortfolio.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addPortfolio.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(action.payload);
            })
            .addCase(addPortfolio.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to add portfolio";
            })
            // 🔹 Edit
            .addCase(editPortfolio.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editPortfolio.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.map((item) =>
                    item.id === action.payload.id ? action.payload : item
                );
            })
            .addCase(editPortfolio.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to edit portfolio";
            })
            // 🔹 Delete
            .addCase(deletePortfolio.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deletePortfolio.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter((item) => item.id !== action.payload);
            })
            .addCase(deletePortfolio.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to delete portfolio";
            });
    },
});

export default portfolioSlice.reducer;
