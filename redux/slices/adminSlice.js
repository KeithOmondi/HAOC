import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../src/api/axios";

/* =========================================================
   🔁 Async Thunks
========================================================= */

// Fetch current admin profile
export const fetchAdminProfile = createAsyncThunk(
  "admin/fetchProfile",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/profile/get"); // GET admin profile
      return data.data; // return admin object
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update admin profile
export const updateAdminProfile = createAsyncThunk(
  "admin/updateProfile",
  async (updates, thunkAPI) => {
    try {
      const { data } = await api.put("/profile/update", updates); // PUT updates
      return data.data; // updated admin object
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

/* =========================================================
   🧱 Slice
========================================================= */
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admin: null,
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearAdminState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    const pending = (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    };
    const rejected = (state, action) => {
      state.loading = false;
      state.error = action.payload || "Operation failed";
    };

    builder
      // Fetch admin profile
      .addCase(fetchAdminProfile.pending, pending)
      .addCase(fetchAdminProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
      })
      .addCase(fetchAdminProfile.rejected, rejected)

      // Update admin profile
      .addCase(updateAdminProfile.pending, pending)
      .addCase(updateAdminProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
        state.success = "Profile updated successfully";
      })
      .addCase(updateAdminProfile.rejected, rejected);
  },
});

export const { clearAdminState } = adminSlice.actions;
export default adminSlice.reducer;
