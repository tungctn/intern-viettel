// export const apiUrl =
//   process.env.NODE_ENV !== "production"
//     ? "http://localhost:5000/api"
//     : "https://sleepy-inlet-56101.herokuapp.com/api";
export const apiUrl =
  // "https://vyaipngtg8.execute-api.ap-south-1.amazonaws.com/Prod/api";
  "http://localhost:3001/api";

export const lambdaServerUrl =
  "https://8hgn2i4gy6.execute-api.ap-southeast-1.amazonaws.com/Prod/api";
export const cognitoServerUrl =
  "https://kb1z7k3ewc.execute-api.ap-southeast-1.amazonaws.com/Prod";

export const LOCAL_STORAGE_TOKEN_NAME = "learnit-mern";

export const POSTS_LOADED_SUCCESS = "POSTS_LOADED_SUCCESS";
export const POSTS_LOADED_FAIL = "POSTS_LOADED_FAIL";
export const ADD_POST = "ADD_POST";
export const DELETE_POST = "DELETE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const FIND_POST = "FIND_POST";
export const FILTER_POST = "FILTER_POST";
