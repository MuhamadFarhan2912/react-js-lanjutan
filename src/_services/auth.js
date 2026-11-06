
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

    if (decodedToken.exp < currentTime) {
      return {
        success: false,
        message: "Token expired",
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
