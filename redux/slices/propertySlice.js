import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../src/api/axios";

/* ============================================================
   🏡 CREATE PROPERTY
============================================================ */
export const createProperty = createAsyncThunk(
  "properties/createProperty",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/properties/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.property;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

/* ============================================================
   📋 GET ALL PROPERTIES (PUBLIC)
============================================================ */
export const getAllProperties = createAsyncThunk(
  "properties/getAll",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams(filters).toString();
      const { data } = await api.get(`/properties/get?${params}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

/* ============================================================
   📋 GET ALL PROPERTIES (ADMIN)
============================================================ */
export const getAllPropertiesAdmin = createAsyncThunk(
  "properties/getAllAdmin",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams(filters).toString();
      const { data } = await api.get(`/properties/get/admin?${params}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

/* ============================================================
   🔍 GET SINGLE PROPERTY
============================================================ */
export const getSingleProperty = createAsyncThunk(
  "properties/getSingle",
  async (idOrSlug, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/properties/get/${idOrSlug}`);
      return data.property;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

/* ============================================================
   ✏️ UPDATE PROPERTY
============================================================ */
export const updateProperty = createAsyncThunk(
  "properties/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/properties/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.property;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

/* ============================================================
   ❌ DELETE PROPERTY
============================================================ */
export const deleteProperty = createAsyncThunk(
  "properties/delete",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/properties/delete/${id}`);
      return { id, message: data.message };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

/* ============================================================
   🧾 APPROVE / UNAPPROVE PROPERTY
============================================================ */
export const approveProperty = createAsyncThunk(
  "properties/approve",
  async ({ id, approved }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/properties/update/${id}/approve`, {
        approved,
      });
      return data.property;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

/* ============================================================
   🧩 PROPERTY SLICE
============================================================ */
const propertySlice = createSlice({
  name: "properties",
  initialState: {
    properties: [],
    property: null,
    total: 0,
    pages: 1,
    page: 1,
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearPropertyState: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ==========================
         CREATE PROPERTY
      ========================== */
      .addCase(createProperty.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.properties = [action.payload, ...state.properties];
          state.success = "Property created successfully.";
        }
      })

      /* ==========================
         GET ALL (PUBLIC)
      ========================== */
      .addCase(getAllProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload?.properties || [];
        state.total = action.payload?.total || 0;
        state.pages = action.payload?.pages || 1;
        state.page = action.payload?.page || 1;
      })

      /* ==========================
         GET ALL (ADMIN)
      ========================== */
      .addCase(getAllPropertiesAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload?.properties || [];
        state.total = action.payload?.total || 0;
        state.pages = action.payload?.pages || 1;
        state.page = action.payload?.page || 1;
      })

      /* ==========================
         GET SINGLE PROPERTY
      ========================== */
      .addCase(getSingleProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.property = null;
      })
      .addCase(getSingleProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.property = action.payload || null;
      })

      /* ==========================
         UPDATE PROPERTY
      ========================== */
      .addCase(updateProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProperty.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.properties.findIndex(
          (p) => p._id === action.payload?._id
        );
        if (index !== -1) state.properties[index] = action.payload;
        state.success = "Property updated successfully.";
      })

      /* ==========================
         DELETE PROPERTY
      ========================== */
      .addCase(deleteProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = state.properties.filter(
          (p) => p._id !== action.payload.id
        );
        state.success = action.payload.message || "Property deleted.";
      })

      /* ==========================
         APPROVE PROPERTY
      ========================== */
      .addCase(approveProperty.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.properties.findIndex(
          (p) => p._id === action.payload?._id
        );
        if (index !== -1) state.properties[index] = action.payload;
        state.success = action.payload?.approved
          ? "Property approved successfully."
          : "Property unapproved.";
      })

      /* ==========================
         MATCHERS
      ========================== */
      // ⏳ Pending
      .addMatcher(
        (action) =>
          action.type.startsWith("properties/") &&
          action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
          state.success = null;
        }
      )

      // ❌ Rejected
      .addMatcher(
        (action) =>
          action.type.startsWith("properties/") &&
          action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload || action.error?.message || "An error occurred.";
        }
      );
  },
});

export const { clearPropertyState } = propertySlice.actions;
export default propertySlice.reducer;
