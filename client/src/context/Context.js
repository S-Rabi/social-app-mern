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
    },
    post: [],
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
