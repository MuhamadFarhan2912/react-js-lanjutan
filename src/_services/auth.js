import API from "../_api";
import { jwtDecode } from "jwt-decode";

// Fungsi Register
export const register = async ({ name, username, email, password }) => {
  try {
    const { data } = await API.post("/register", {
      name,
      username,
      email,
      password,
    });

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Fungsi Login
export const login = async ({ email, password }) => {
  try {
    const { data } = await API.post("/login", { email, password });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Fungsi Validasi Token
export const checkTokenValidity = (token) => {
  if (!token) {
    return {
      success: false,
      message: "Token tidak ditemukan",
      data: null,
    };
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (!decodedToken.exp || decodedToken.exp <= currentTime) {
      return {
        success: false,
        message: "Token tidak valid atau expired",
        data: null,
      };
    }

    return {
      success: true,
      message: "Token valid",
      data: decodedToken,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
};

// Mengambil data user dari localStorage
export const getStoredUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    return null;
  }
};

// Mengecek apakah pengguna sudah login
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  const user = getStoredUser();

  return checkTokenValidity(token).success && !!user;
};

// Mengecek hak akses berdasarkan role
export const hasRole = (allowedRoles = []) => {
  const user = getStoredUser();

  return !!user && allowedRoles.includes(user.role);
};

// Menghapus data autentikasi
export const clearAuthData = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// Fungsi Logout
export const logout = async (token) => {
  try {
    const { data } = await API.post(
      "/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
