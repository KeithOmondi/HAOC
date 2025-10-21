import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../src/api/axios";

/* ============================================================
   📦 THUNKS — Async API Actions
============================================================ */

// ✅ Create new event (Admin only)
export const createEvent = createAsyncThunk(
  "events/create",
  async (eventData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/events/create", eventData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.event;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create event");
    }
  }
);


// ✅ Fetch all events (public)
export const fetchEvents = createAsyncThunk(
  "events/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/events/get");
      return data.events;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch events");
    }
  }
);

// ✅ Fetch single event by ID
export const fetchEventById = createAsyncThunk(
  "events/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/events/get/${id}`);
      return data.event;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch event");
    }
  }
);




// ✅ Update event (Admin only)
// ✅ Update event (Admin only)
export const updateEvent = createAsyncThunk(
  "events/update",
  async ({ id, eventData }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/events/update/${id}`, eventData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.event;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update event"
      );
    }
  }
);


// ✅ Delete event (Admin only)
export const deleteEvent = createAsyncThunk(
  "events/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/events/delete/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete event");
    }
  }
);

/* ============================================================
   🧩 SLICE — Reducers & State
============================================================ */
const eventSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
    event: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearEventState: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH ALL
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH SINGLE
      .addCase(fetchEventById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.loading = false;
        state.event = action.payload;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events.push(action.payload);
        state.success = true;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events = state.events.map((evt) =>
          evt._id === action.payload._id ? action.payload : evt
        );
        state.success = true;
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events = state.events.filter((evt) => evt._id !== action.payload);
        state.success = true;
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearEventState } = eventSlice.actions;
export default eventSlice.reducer;
