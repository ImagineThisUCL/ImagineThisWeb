import axios from 'axios';
import moment from 'moment';
import { BACKEND_ADDRESS } from './consts';

const api = axios.create({
  baseURL: `${BACKEND_ADDRESS}/api/v1`,
});

const projectAPI = (method) => api({
  method,
  url: '/projects',
});

const feedbackAPI = (method, projectID, feedbackID, data) => {
  if (method.toUpperCase() === 'POST') {
    if (data === undefined) {
      throw new Error('Unsupported');
    }
    return api({
      method,
      url: `/projects/${projectID}/feedback`,
      data,
    });
  }
  if (method.toUpperCase() === 'PATCH') {
    if (data === undefined || feedbackID === undefined) {
      throw new Error('Unsupported');
    }
    return api({
      method,
      url: `/projects/${projectID}/feedback/${feedbackID}`,
      data,
    });
  }

  if (method.toUpperCase() === 'DELETE') {
    return api({
      method,
      url: `/projects/${projectID}/feedback/${feedbackID}`,
    });
  }

  if (method.toUpperCase() === 'GET') {
    return api({
      method,
      url: `/projects/${projectID}/feedback${feedbackID ? `/${feedbackID}` : ''}`,
      // parse the response data
      transformResponse: [(resData) => {
        const parsedData = parseFeedbacks(JSON.parse(resData));
        return parsedData;
      }],
    });
  }
  throw new Error('Unsupported');
};

const userAPI = (method, userID, data) => {
  if (method.toUpperCase() === 'POST') {
    if (data === undefined) {
      throw new Error("Unsupported");
    }
    return api({
      method,
      url: '/users',
      data,
    });
  }

  if (method.toUpperCase() === 'PATCH') {
    if (userID === undefined || data === undefined) {
      throw new Error("Unsupported");
    }
    return api({
      method,
      url: `/users/${userID}`,
      data,
    });
  }

  if (method.toUpperCase() === 'GET') {
    if (userID === undefined) {
      throw new Error("Unsupported");
    }
    return api({
      method,
      url: `/users/${userID}/votes`,
    });
  }
  throw new Error('Unsupported');
};

const voteAPI = (method, projectID, feedbackID, voteID, data) => {
  if (projectID === undefined || feedbackID === undefined) {
    throw new Error("Unsupported");
  }

  if (method.toUpperCase() === 'GET' || method.toUpperCase() === 'POST') {
    return api({
      method,
      url: `/projects/${projectID}/feedback/${feedbackID}/vote`,
      data,
    });
  }

  if (method.toUpperCase() === 'PATCH' || method.toUpperCase() === 'DELETE') {
    if (voteID === undefined || data === undefined) {
      throw new Error("Unsupported");
    }
    return api({
      method,
      url: `/projects/${projectID}/feedback/${feedbackID}/vote/${voteID}`,
      data,
    });
  }
  throw new Error('Unsupported');
};

/**
 * This function will parse the original response data
 * @param {original response data} data 
 */
const parseFeedbacks = (data) => {
  const feedbackList = [];
  data.forEach((feedback) => {
    const {
      userId,
      projectId,
      feedbackId,
      downvotes,
      text,
      timestamp,
      upvotes,
      userName,
    } = feedback;

    const parsedFeedback = {
      userID: userId,
      projectID: projectId,
      feedbackID: feedbackId,
      userName,
      created: moment(timestamp).format("DD/MM/YY HH:mm"),
      timestamp,
      text,
      votes: upvotes - downvotes,
    };
    feedbackList.push(parsedFeedback);
  });
  return feedbackList;
};

export default api;

export {
  projectAPI, feedbackAPI, userAPI, voteAPI,
};
