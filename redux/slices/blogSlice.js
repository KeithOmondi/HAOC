// src/redux/slices/blogSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../src/api/axios";

/* ======================================================
   🧠 ASYNC THUNKS — BLOG CRUD + FETCH BY ID
====================================================== */

// 📥 Fetch all blogs
export const fetchBlogs = createAsyncThunk("blogs/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get("/blogs/get");
    return data.blogs || [];
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to load blogs");
  }
});

// 📰 Fetch single blog
export const fetchBlogById = createAsyncThunk("blogs/fetchById", async (id, { rejectWithValue }) => {
  try {
    const { data } = await api.get(`/blogs/get/${id}`);
    return data.blog;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch blog details");
  }
});

// 📝 Create new blog
export const createBlog = createAsyncThunk("blogs/create", async (blogData, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    Object.entries(blogData).forEach(([key, value]) => formData.append(key, value));

    const { data } = await api.post("/blogs/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
    return data.blog;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to create blog");
  }
});

// ✏️ Update blog
export const updateBlog = createAsyncThunk("blogs/update", async ({ id, blogData }, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    Object.entries(blogData).forEach(([key, value]) => formData.append(key, value));

    const { data } = await api.put(`/blogs/update/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
    return data.blog;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to update blog");
  }
});

// 🗑️ Delete blog
export const deleteBlog = createAsyncThunk("blogs/delete", async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/blogs/delete/${id}`, { withCredentials: true });
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to delete blog");
  }
});

/* ======================================================
   🧩 SLICE
====================================================== */
const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    currentBlog: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetBlogState: (state) => {
      state.error = null;
      state.success = false;
    },
    clearCurrentBlog: (state) => {
      state.currentBlog = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH ALL
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH BY ID
      .addCase(fetchBlogById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentBlog = null;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBlog = action.payload;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs.unshift(action.payload);
        state.success = true;
      })

      // UPDATE
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.blogs.findIndex((b) => b._id === action.payload._id);
        if (index !== -1) state.blogs[index] = action.payload;
        state.success = true;
      })

      // DELETE
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = state.blogs.filter((b) => b._id !== action.payload);
        state.success = true;
      });
  },
});

export const { resetBlogState, clearCurrentBlog } = blogSlice.actions;
export default blogSlice.reducer;
