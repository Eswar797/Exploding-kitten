import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export let serverUrl = "https://exploding-kitten-backend.onrender.com";

export const UserSlice = createSlice({
  name: "UserSlice",
  initialState: {
    result: "",
    isAuthenticated: false,
    user: {},
  },
  reducers: {
    changeResult: (state, action) => {
      state.result = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { changeResult, setIsAuthenticated, setUser } = UserSlice.actions;

export async function fetchData() {
  try {
    let res = await fetch(`${serverUrl}/api/v1/user`);
    let data = await res.json();
    if (data) {
    }
  } catch (error) {
    throw new Error(error.message);
    // console.log(error);
  }
}

export async function Register(name, email, password, navigate) {
  try {
    let res = await fetch(`${serverUrl}/api/v1/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    let data = await res.json();
    if (data.success === true) {
      toast.success(data.message, {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate("/login");
    } else {
      return toast.error(data.message, {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  } catch (error) {
    return toast.error(error.message, {
      position: "top-center",
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
}

export async function Login(email, password, dispatch, navigate) {
  try {
    let res = await fetch(`${serverUrl}/api/v1/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    let data = await res.json();
    if (data.success === true) {
      dispatch(setIsAuthenticated(true));
      localStorage.setItem("token", JSON.stringify(data.token));
      toast.success(data.message, {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate("/");
    } else {
      return toast.error(data.message, {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  } catch (error) {
    toast.error(error.message, {
      position: "top-center",
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
}

export async function GetProfile(dispatch) {
  let token = JSON.parse(localStorage.getItem("token"));
  try {
    let res = await fetch(`${serverUrl}/api/v1/user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    let data = await res.json();
    if (data.success === true) {
      dispatch(setIsAuthenticated(true));
      dispatch(setUser({ name: data.user.name, matches: data.user.matches }));
      toast.success(data.message, {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      return toast.error(data.message, {
        position: "top-center",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  } catch (error) {
    toast.error(error.message, {
      position: "top-center",
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
}
