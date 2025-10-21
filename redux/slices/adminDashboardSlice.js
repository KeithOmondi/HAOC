import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../src/api/axios";

/* ============================================================
   📊 FETCH ADMIN DASHBOARD STATS
============================================================ */
export const fetchAdminDashboard = createAsyncThunk(
  "adminDashboard/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/admin/dashboard");
      return data.stats;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

/* ============================================================
   🧩 SLICE
============================================================ */
const adminDashboardSlice = createSlice({
  name: "adminDashboard",
  initialState: {
    summary: {
      totalProperties: 0,
      totalUsers: 0,
      totalAgents: 0,
      totalBookings: 0,
      pendingBookings: 0,
      confirmedBookings: 0,
      cancelledBookings: 0,
    },
    charts: {
      bookingTrends: [],
      propertyCategoryStats: [],
    },
    loading: false,
    error: null,
  },
  reducers: {
    clearAdminDashboardError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload.summary;
        state.charts = action.payload.charts;
      })
      .addCase(fetchAdminDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load dashboard data.";
      });
  },
});

export const { clearAdminDashboardError } = adminDashboardSlice.actions;

export const selectAdminDashboard = (state) => state.adminDashboard;

export default adminDashboardSlice.reducer;
