import { createAsyncThunk } from "@reduxjs/toolkit";
import { setUserDetails } from "./auth.slice";
import { openAlertMessage } from "../alert/alert.slice";
import * as api from "../../api";

// Login Thunk
export const login = createAsyncThunk(
  "auth/login",
  async ({ userDetails, navigate }, { dispatch, rejectWithValue }) => {
    try {
      console.log(userDetails);
      // Make API call to log in the user
      const response = await api.login(userDetails);

      // Check if there was an error in the response
      if (response.error) {
        // Trigger the alert and reject the thunk
        console.log("error: ", response);
        dispatch(openAlertMessage(response.message || "Login failed."));
        return rejectWithValue(response.message);
      }

      // Extract userDetails from response
      const { userDetails: loggedInUser } = response.data;

      console.log("logged In", loggedInUser);

      // Store user details in local storage
      localStorage.setItem("user", JSON.stringify(loggedInUser));

      // Dispatch action to set user details in Redux store
      dispatch(setUserDetails(loggedInUser));

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);

      // Extract error message
      let errorMessage = "Login failed. Please try again.";
      if (error.response && error.response.data) {
        errorMessage = error.response.data.message || errorMessage;
      }

      // Dispatch alert message
      dispatch(openAlertMessage(errorMessage));

      // Reject the thunk with the error message
      return rejectWithValue(errorMessage);
    }
  }
);

// Register Thunk
export const register = createAsyncThunk(
  "auth/register",
  async ({ userDetails, navigate }, { dispatch, rejectWithValue }) => {
    try {
      console.log("User Details:", userDetails);

      // Make API call to register the user
      const response = await api.register(userDetails);
      console.log("API Response:", response);

      // Check if the API returned an error
      if (response.error) {
        throw new Error(
          response.exception?.response?.data?.message || "Registration failed."
        );
      }

      console.log("user_data", response);

      // Extract userDetails from response

      const { userDetails: registeredUser } = response.data;

      console.log("registered", registeredUser);

      // Store user details in local storage
      localStorage.setItem("user", JSON.stringify(registeredUser));

      // Dispatch action to set user details in Redux store
      dispatch(setUserDetails(registeredUser));

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration Error:", error);

      // Extract error message
      let errorMessage = "Registration failed. Please try again.";
      if (error.response && error.response.data) {
        errorMessage = error.response.data.message || errorMessage;
      }

      // Dispatch alert message
      dispatch(openAlertMessage(errorMessage));

      // Reject the thunk with the error message
      return rejectWithValue(errorMessage);
    }
  }
);

// Updated getActions function
export const getActions = (dispatch) => {
  return {
    login: (userDetails, navigate) =>
      dispatch(login({ userDetails, navigate })),
    register: (userDetails, navigate) =>
      dispatch(register({ userDetails, navigate })),
    setUserDetails: (userDetails) => dispatch(setUserDetails(userDetails)),
  };
};
