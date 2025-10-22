import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

/* =========================================================
   🔁 Async Thunks
========================================================= */

// Fetch all careers
export const fetchCareers = createAsyncThunk(
  "careers/fetchCareers",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/careers/get");
      console.log("CAREERS API RESPONSE:", data);
      // Return depending on your backend structure
      return data.data || data.careers || data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Create a new career (Admin)
export const createCareer = createAsyncThunk(
  "careers/createCareer",
  async (careerData, thunkAPI) => {
    try {
      const { data } = await api.post("/careers/create", careerData);
      return data.data || data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update a career (Admin)
export const updateCareer = createAsyncThunk(
  "careers/updateCareer",
  async ({ id, updates }, thunkAPI) => {
    try {
      const { data } = await api.put(`/careers/update?id=${id}`, updates);
      return data.data || data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete a career (Admin)
export const deleteCareer = createAsyncThunk(
  "careers/deleteCareer",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/careers/delete?id=${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

/* =========================================================
   🧱 Slice
========================================================= */
const careerSlice = createSlice({
  name: "careers",
  initialState: {
    careers: [],
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearCareerState: (state) => {
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
      .addCase(fetchCareers.pending, pending)
      .addCase(fetchCareers.fulfilled, (state, action) => {
        state.loading = false;
        state.careers = action.payload; // All careers, filtering happens in component
      })
      .addCase(fetchCareers.rejected, rejected)

      .addCase(createCareer.pending, pending)
      .addCase(createCareer.fulfilled, (state, action) => {
        state.loading = false;
        state.careers.push(action.payload);
        state.success = "Career created successfully";
      })
      .addCase(createCareer.rejected, rejected)

      .addCase(updateCareer.pending, pending)
      .addCase(updateCareer.fulfilled, (state, action) => {
        state.loading = false;
        state.careers = state.careers.map((c) =>
          c._id === action.payload._id ? action.payload : c
        );
        state.success = "Career updated successfully";
      })
      .addCase(updateCareer.rejected, rejected)

      .addCase(deleteCareer.pending, pending)
      .addCase(deleteCareer.fulfilled, (state, action) => {
        state.loading = false;
        state.careers = state.careers.filter((c) => c._id !== action.payload);
        state.success = "Career deleted successfully";
      })
      .addCase(deleteCareer.rejected, rejected);
  },
});

export const { clearCareerState } = careerSlice.actions;
export default careerSlice.reducer;
