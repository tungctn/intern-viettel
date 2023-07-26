import { USERS_LOADED_SUCCESS } from "../contexts/constants";

export const userReducer = (state, action) => {
  switch (action.type) {
    case USERS_LOADED_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
  }
};
