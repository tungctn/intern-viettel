import { createContext, useContext, useReducer, useState } from "react";
import { postReducer } from "../reducers/postReducer";
import {
  apiUrl,
  POSTS_LOADED_FAIL,
  POSTS_LOADED_SUCCESS,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  FIND_POST,
  FILTER_POST,
  lambdaServerUrl,
  SET_AUTH,
} from "./constants";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  // State
  const [postState, dispatch] = useReducer(postReducer, {
    post: null,
    posts: [],
    postsLoading: true,
  });

  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  const { loadUser } = useContext(AuthContext);

  // Get all posts
  const getPosts = async () => {
    try {
      const response = await axios.get(`${lambdaServerUrl}/posts`);
      if (response.data.success) {
        dispatch({ type: POSTS_LOADED_SUCCESS, payload: response.data.posts });
      }
    } catch (error) {
      dispatch({ type: POSTS_LOADED_FAIL });
    }
  };

  const getOwnPosts = async () => {
    try {
      const response = await axios.get(`${lambdaServerUrl}/posts/own`);
      console.log(response.data.posts);
      if (response.data.success) {
        dispatch({ type: POSTS_LOADED_SUCCESS, payload: response.data.posts });
      }
    } catch (error) {
      dispatch({ type: POSTS_LOADED_FAIL });
    }
  };

  // Add post
  const addPost = async (newPost) => {
    try {
      const response = await axios.post(`${lambdaServerUrl}/posts`, newPost);
      if (response.data.success) {
        dispatch({ type: ADD_POST, payload: response.data.post });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // Delete post
  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(`${lambdaServerUrl}/posts/${postId}`);
      if (response.data.success) {
        dispatch({ type: DELETE_POST, payload: postId });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Like post
  const likePost = async (postId) => {
    try {
      const response = await axios.put(
        `${lambdaServerUrl}/posts/like/${postId}`
      );
      if (response.data.success) {
        dispatch({ type: UPDATE_POST, payload: response.data.post });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Find post when user is updating post
  const findPost = (postId) => {
    const post = postState.posts.find((post) => post.id === postId);
    dispatch({ type: FIND_POST, payload: post });
  };

  // Update post
  const updatePost = async (updatedPost) => {
    try {
      const response = await axios.put(
        `${lambdaServerUrl}/posts/${updatedPost.id}`,
        updatedPost
      );
      if (response.data.success) {
        dispatch({ type: UPDATE_POST, payload: response.data.post });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  const searchPost = async (searchValue) => {
    if (searchValue.trim() !== "") {
      const response = await axios.get(
        `${lambdaServerUrl}/posts/search/${searchValue.trim()}`
      );
      if (response.data.success) {
        dispatch({ type: POSTS_LOADED_SUCCESS, payload: response.data.posts });
      } else {
        dispatch({ type: POSTS_LOADED_FAIL });
      }
    }
  };

  const searchOwnPost = async (searchValue) => {
    if (searchValue.trim() !== "") {
      const response = await axios.get(
        `${lambdaServerUrl}/posts/own/search/${searchValue.trim()}`
      );
      if (response.data.success) {
        dispatch({ type: POSTS_LOADED_SUCCESS, payload: response.data.posts });
      } else {
        dispatch({ type: POSTS_LOADED_FAIL });
      }
    }
  };

  // Post context data
  const postContextData = {
    postState,
    getPosts,
    getOwnPosts,
    showAddPostModal,
    setShowAddPostModal,
    showUpdatePostModal,
    setShowUpdatePostModal,
    addPost,
    showToast,
    setShowToast,
    deletePost,
    findPost,
    updatePost,
    searchPost,
    searchOwnPost,
    likePost,
  };

  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
