import { createContext, useReducer } from "react";

export const SocialContext = createContext();

function ContextProvider({ children }) {
  const reducer = (state, action) => {
    switch (action.type) {
      case "login":
        return {
          ...state,
          user: { ...action.payload },
        };

      case "logout":
        return reset;

      case "saveProfile":
        return {
          ...state,
          user: { ...action.payload },
        };

      case "updaterCover":
        return {
          ...state,
          user: { ...state.user, coverImage: action.payload },
        };
      case "addPost":
        return {
          ...state,
          posts: [...state.posts, action.payload],
        };
      case "getPosts":
        return {
          ...state,
          posts: [...action.payload],
        };

      default:
        return state;
    }
  };

  const reset = {
    user: {
      name: "",
      title: "",
      email: "",
      phone: "",
      about: "",
      likes: [],
      facebook: "",
      twitter: "",
      instagram: "",
      username: "",
      coverImage: "",
      profileImage: "",
      followers: [],
      followings: [],
      isAdmin: false,
      _id: "",
    },
    posts: [],
    isFetching: false,
    error: false,
  };

  const [state, dispatch] = useReducer(reducer, reset);

  return (
    <SocialContext.Provider value={{ state, dispatch }}>
      {children}
    </SocialContext.Provider>
  );
}

export default ContextProvider;
