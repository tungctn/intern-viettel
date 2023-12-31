import { createContext, useReducer, useEffect } from "react";
import { authReducer } from "../reducers/authReducer";
import {
  apiUrl,
  cognitoServerUrl,
  lambdaServerUrl,
  s3ServerUrl,
  LOCAL_STORAGE_TOKEN_NAME,
  SET_AUTH,
  REFRESH_TOKEN_NAME,
} from "./constants";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import cognito from "../utils/cognito";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });

  const refreshToken = async () => {
    const params = {
      AuthFlow: "REFRESH_TOKEN_AUTH",
      ClientId: process.env.REACT_APP_CLIENT_ID, // replace with your client id
      UserPoolId: process.env.REACT_APP_USERPOOL_ID, // replace with your user pool id
      AuthParameters: {
        REFRESH_TOKEN: localStorage[REFRESH_TOKEN_NAME], // replace with the refresh token value
      },
    };
    cognito.initiateAuth(params, function (err, authResult) {
      if (err) {
        console.log(err);
      } else {
        console.log(
          "New Access Token:",
          authResult.AuthenticationResult.AccessToken
        );
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          authResult.AuthenticationResult.AccessToken
        );
        setAuthToken(authResult.AuthenticationResult.AccessToken);
        // loadUser();
      }
    });
  };

  // Authenticate user
  const loadUser = async () => {
    console.log("loadUser");
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }

    try {
      const response = await axios.get(`${lambdaServerUrl}/auth`);
      if (response.data.success) {
        console.log(response.data);
        dispatch({
          type: SET_AUTH,
          payload: { isAuthenticated: true, user: response.data.user },
        });
      }
    } catch (error) {
      refreshToken();
      setAuthToken(null);
      dispatch({
        type: SET_AUTH,
        payload: { isAuthenticated: false, user: null },
      });
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  // Login
  const loginUser = async (userForm) => {
    try {
      const params = {
        AuthFlow: "USER_PASSWORD_AUTH",
        ClientId: process.env.REACT_APP_CLIENT_ID,
        AuthParameters: {
          USERNAME: userForm.username,
          PASSWORD: userForm.password,
        },
      };

      cognito.initiateAuth(params, async (err, result) => {
        if (err) {
          console.log(err);
        }
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          result.AuthenticationResult.AccessToken
        );
        localStorage.setItem(
          REFRESH_TOKEN_NAME,
          result.AuthenticationResult.RefreshToken
        );
        await loadUser();
      });

      return {
        success: true,
        message: "User logged in successfully",
      };
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Register
  const registerUser = async (userForm) => {
    try {
      const response = await axios.post(
        `${cognitoServerUrl}/auth/register`,
        userForm
      );
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  const confirmUser = async (userForm) => {
    try {
      const response = await axios.post(
        `${cognitoServerUrl}/auth/confirm`,
        userForm
      );

      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  const uploadImage = async (formData) => {
    try {
      const response = await axios.post(
        `${s3ServerUrl}/upload/${authState?.user?.id}`,
        formData
      );
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Logout
  const logoutUser = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    dispatch({
      type: "SET_AUTH",
      payload: { isAuthenticated: false, user: null },
    });
  };

  // Context data
  const authContextData = {
    loginUser,
    registerUser,
    uploadImage,
    logoutUser,
    authState,
    confirmUser,
    loadUser,
  };

  // Return provider
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
