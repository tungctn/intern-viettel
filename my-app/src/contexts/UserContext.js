import { createContext, useReducer } from "react";
import { USERS_LOADED_SUCCESS, lambdaServerUrl } from "./constants";
import { userReducer } from "../reducers/userReducer";
import axios from "axios";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userState, dispatch] = useReducer(userReducer, {
    users: [],
    usersLoading: true,
  });

  const loadUsers = async () => {
    try {
      const response = await axios.get(`${lambdaServerUrl}/users`);
      if (response.data.success) {
        dispatch({ type: USERS_LOADED_SUCCESS, payload: response.data.users });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const UserContextData = { loadUsers, userState };

  return (
    <UserContext.Provider value={UserContextData}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
