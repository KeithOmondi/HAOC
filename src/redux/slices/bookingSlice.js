import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "../../api/axios";

/* ─────────────────────────────
   🧩 Async Thunks
─────────────────────────────── */

/**
 * User: Creates a new property viewing booking.
 */
export const createBooking = createAsyncThunk(
  "bookings/createBooking",
  async (bookingData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/bookings/create", bookingData, {
        withCredentials: true,
      });
      return data.booking;
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Failed to create booking.";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

/**
 * User: Fetch all bookings for the logged-in user.
 */
export const fetchUserBookings = createAsyncThunk(
  "bookings/fetchUserBookings",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/bookings/user", {
        withCredentials: true,
      });
      return data.bookings;
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to fetch user bookings.";
      return rejectWithValue(message);
    }
  }
);

/**
 * Admin: Fetch all bookings.
 */
export const fetchAllBookings = createAsyncThunk(
  "bookings/fetchAllBookings",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/bookings/admin", {
        withCredentials: true,
      });
      return data.bookings;
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to fetch all bookings.";
      return rejectWithValue(message);
    }
  }
);

/**
 * Admin: Update booking status.
 */
export const updateBookingStatus = createAsyncThunk(
  "bookings/updateBookingStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(
        `/bookings/admin/${id}/status`,
        { status },
        { withCredentials: true }
      );
      return data.booking;
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Failed to update booking status.";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

/* ─────────────────────────────
   🧭 Slice Definition
─────────────────────────────── */

const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    bookings: [],       // Admin/All bookings
    userBookings: [],   // Specific user's bookings
    loading: false,     // Generic loading flag
    error: null,        // Error message
  },
  reducers: {
    clearBookingError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ── Create Booking ─────────────────── */
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        // Add new booking to start of userBookings
        state.userBookings.unshift(action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ── Fetch User Bookings ────────────── */
      .addCase(fetchUserBookings.pending, (state) => {
        // Don’t clear old data — prevents flicker
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.userBookings = action.payload;
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ── Fetch All Bookings (Admin) ─────── */
      .addCase(fetchAllBookings.pending, (state) => {
        // Keep current bookings; just flag loading
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchAllBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ── Update Booking Status ──────────── */
      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        const updated = action.payload;

        // Update in admin list
        const adminIndex = state.bookings.findIndex(
          (b) => b._id === updated._id
        );
        if (adminIndex !== -1) {
          state.bookings[adminIndex] = updated;
        }

        // Update in user list (if applicable)
        const userIndex = state.userBookings.findIndex(
          (b) => b._id === updated._id
        );
        if (userIndex !== -1) {
          state.userBookings[userIndex] = updated;
        }
      })
      .addCase(updateBookingStatus.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

/* ─────────────────────────────
   🧮 Selectors
─────────────────────────────── */
export const selectAllBookings = (state) => state.bookings.bookings;
export const selectUserBookings = (state) => state.bookings.userBookings;
export const selectBookingLoading = (state) => state.bookings.loading;
export const selectBookingError = (state) => state.bookings.error;

/* ─────────────────────────────
   📤 Exports
─────────────────────────────── */
export const { clearBookingError } = bookingSlice.actions;
export default bookingSlice.reducer;
