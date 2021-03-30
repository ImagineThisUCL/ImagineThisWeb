import React, { useReducer, createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { userAPI } from "../api";

const FeedbackContext = createContext();

const globalState = {
  projectName: "",
  projectID: "",
  userID: "",
  userName: "",
  feedbacks: [],
  conversions: [],
  votedFeedbacks: {},
  projectExists: true,
  successModal: false,
  errorModal: false,
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
      };
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
    case "SET_CONVERSIONS":
      return {
        ...state,
        conversions: action.payload,
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
    case "SET_SUCCESS_MODAL":
      return {
        ...state,
        successModal: action.payload,
      };
    case "SET_ERROR_MODAL":
      return {
        ...state,
        errorModal: action.payload,
      };
    default:
      throw new Error("Operation not supported.");
  }
};

const FeedbackContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, globalState);

  const createAnonymousUser = () => {
    // create an anonymous user
    console.log("Generating new user credential");
    const userName = "Anonymous User";
    const userID = uuidv4();
    // send a request to the server
    userAPI("POST", undefined, { userId: userID, userName })
      .then((res) => {
        if (res.data.success) {
          console.log("Setting up local Storage");
          // update localStorage
          localStorage.setItem("user", JSON.stringify({ userID, userName }));
          setUserCredential(userName, userID);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   * This method will update the userName and userID in global context
   */
  const setUserCredential = (userName, userID) => {
    dispatch({
      type: "SET_USER_NAME",
      payload: userName,
    });
    dispatch({
      type: "SET_USER_ID",
      payload: userID,
    });
  };

  useState(() => {
    // check if there is a user credential stored in localStorage
    // if not, create a new user credential
    const storedUserStr = localStorage.getItem("user");
    let userID = "";
    let userName = "";
    if (storedUserStr === null) {
      createAnonymousUser();
    } else {
      // get user credential from localStorage
      const storedUser = JSON.parse(storedUserStr);
      userID = storedUser.userID;
      userName = storedUser.userName;
      setUserCredential(userName, userID);
    }
  }, []);

  return (
    <FeedbackContext.Provider value={[state, dispatch]}>
      {props.children}
    </FeedbackContext.Provider>
  );
};

export { FeedbackContext, FeedbackContextProvider };
