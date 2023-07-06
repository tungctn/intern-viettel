// export const apiUrl =
//   process.env.NODE_ENV !== "production"
//     ? "http://localhost:5000/api"
//     : "https://sleepy-inlet-56101.herokuapp.com/api";
export const apiUrl =
  // "https://vyaipngtg8.execute-api.ap-south-1.amazonaws.com/Prod/api";
  "http://localhost:3001/api";

export const lambdaServerUrl =
  // "https://ed4a49f1v2.execute-api.ap-southeast-1.amazonaws.com/Prod/api";
  process.env.REACT_APP_API_LAMBDA;
export const cognitoServerUrl =
  // "https://kb1z7k3ewc.execute-api.ap-southeast-1.amazonaws.com/Prod";
  process.env.REACT_APP_API_AUTH;
export const s3ServerUrl = process.env.REACT_APP_API_S3;

export const LOCAL_STORAGE_TOKEN_NAME = "learnit-mern";

export const POSTS_LOADED_SUCCESS = "POSTS_LOADED_SUCCESS";
export const POSTS_LOADED_FAIL = "POSTS_LOADED_FAIL";
export const ADD_POST = "ADD_POST";
export const DELETE_POST = "DELETE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const FIND_POST = "FIND_POST";
export const FILTER_POST = "FILTER_POST";
