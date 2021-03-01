import React, { useReducer, createContext } from 'react';

const FeedbackContext = createContext();

const globalState = {
  projectName: "",
  projectID: "",
  userID: "",
  userName: "",
  feedbacks: [],
  votedFeedbacks: {},
  projectExists: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT_GLOBAL_STATE":
      return {
        ...state,
        ...action.payload,
      };
    case "SET_PROJECT_ID":
      return {
        ...state,
        projectID: action.payload,
      };
    case "SET_PROJECT_NAME":
      return {
        ...state,
        projectName: action.payload,
      }
    case "SET_USER_ID":
      return {
        ...state,
        userID: action.payload,
      };
    case "SET_USER_NAME":
      return {
        ...state,
        userName: action.payload,
      };
    case "SET_FEEDBACKS":
      return {
        ...state,
        feedbacks: action.payload,
      };
    case "ADD_FEEDBACK":
      return {
        ...state,
        feedbacks: [...state.feedbacks, action.payload],
      };
    case "SET_VOTED_FEEDBACKS":
      return {
        ...state,
        votedFeedbacks: action.payload,
      };
    case "SET_PROJECT_EXISTS":
      return {
        ...state,
        projectExists: action.payload,
      };
    default:
      throw new Error("Operation not supported.");
  }
};

const FeedbackContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, globalState);
  return <FeedbackContext.Provider value={[state, dispatch]}>{props.children}</FeedbackContext.Provider>;
};

export { FeedbackContext, FeedbackContextProvider };
