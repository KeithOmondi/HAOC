import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

/* ============================================================
   🔹 Async Thunks
============================================================ */

// 🟢 Fetch all categories
export const fetchCategories = createAsyncThunk(
  "categories/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/categories/get");
      return data.categories || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch categories"
      );
    }
  }
);

// 🟣 Create new category (Admin only)
export const createCategory = createAsyncThunk(
  "categories/create",
  async (categoryData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/categories/create", categoryData, {
        headers: { "Content-Type": "application/json" },
      });
      return data.category;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create category"
      );
    }
  }
);

/* ============================================================
   🧭 Slice
============================================================ */

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    allCategories: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearCategoryState: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- FETCH ALL ---------- */
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.allCategories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- CREATE CATEGORY ---------- */
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.allCategories.unshift(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

/* ============================================================
   🧩 Selectors & Exports
============================================================ */
export const { clearCategoryState } = categorySlice.actions;

export const selectAllCategories = (state) => state.categories.allCategories;
export const selectCategoryLoading = (state) => state.categories.loading;
export const selectCategoryError = (state) => state.categories.error;

export default categorySlice.reducer;
