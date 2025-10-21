// src/utils/tokenStorage.js
import { jwtDecode } from "jwt-decode";

const ACCESS_TOKEN_KEY = "accessToken";

// ==========================
// Save Token
// ==========================
export const saveAccessToken = (token) => {
  if (token) {
    try {
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
      return token;
    } catch (e) {
      console.error("Failed to save access token:", e);
    }
  }
  return null;
};

// ==========================
// Get Token
// ==========================
export const getAccessToken = () => {
  try {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  } catch (e) {
    console.error("Failed to read access token:", e);
    return null;
  }
};

// ==========================
// Remove Token
// ==========================
export const removeAccessToken = () => {
  try {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  } catch (e) {
    console.error("Failed to remove access token:", e);
  }
};

// ==========================
// Check if Token is Valid
// ==========================
export const hasValidToken = () => {
  const token = getAccessToken();
  if (!token) return false;

  try {
    // jwtDecode returns an object, which we'll call decoded.
    const decoded = jwtDecode(token);
    
    // Check for expiration timestamp (exp) and if it's in the future.
    // decoded.exp is in seconds, Date.now() is in milliseconds, so we multiply exp by 1000.
    if (decoded.exp && Date.now() < decoded.exp * 1000) {
      return true; // Token not expired
    }
    
    return false; // Expired or missing exp claim
  } catch (e) {
    console.error("Invalid token format:", e);
    return false;
  }
};