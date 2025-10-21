import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import propertiesReducer from "./slices/propertySlice";
import categorieReducer from "./slices/categorySlice"
import bookingReducer from "./slices/bookingSlice";
import adminDashboardReducer from "./slices/adminDashboardSlice";
import blogsReducer from "./slices/blogSlice"
import eventsReducer from "./slices/eventSlice"
import careersReducer from "./slices/careerSlice"
import adminReducer from "./slices/adminSlice"

const Store = configureStore({
  reducer: {
    auth: authReducer,
    properties: propertiesReducer,
    categories: categorieReducer,
    bookings: bookingReducer,
    adminDashboard: adminDashboardReducer, 
    blogs: blogsReducer,
    events: eventsReducer,
    careers: careersReducer,
    admin: adminReducer
  },
});

export default Store;
