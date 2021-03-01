import React, { useContext, useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { FeedbackContext } from "../../contexts/feedback-context";
import FeedbackForm from '../feedbacks/FeedbackForm';
import FeedbackList from '../feedbacks/FeedbackList';

import { feedbackAPI, userAPI } from "../../api";

const FeedbackTab = (props) => {
  // useContext can be used to access global context and dispatch changes
  const [state, dispatch] = useContext(FeedbackContext);
  // useState is the react hooks style of this.state. The parameter is the initial value of this state
  const [sortButtonText, setSortButtonText] = useState("Sort by Time");
  // get feedbacks
  useEffect(() => {
    // get all votes for the existing user
    userAPI('GET', state.userID)
      .then((res) => {
        if (res.status == 200 && res.data.length > 0) {
          const voted = {};
          res.data.map((vote) => {
            voted[vote.feedbackId] = { voteID: vote.voteId, voteValue: vote.voteValue };
          });
          dispatch({
            type: "SET_VOTED_FEEDBACKS",
            payload: voted,
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
    // check if there's any vote associated to the current user
    // this.getVotesForUser()
    feedbackAPI('GET', props.projectID)
      .then((res) => {
        const parsed = res.data;
        // process the feedbacks and update it
        // const parsed = parseFeedbacks(res.data);
        // sort feedbacks by time by default
        parsed.sort(sortByTime('timestamp'));
        dispatch({
          type: "INIT_GLOBAL_STATE",
          payload: {
            projectID: props.projectID,
            feedbacks: parsed,
          },
        });
      })
      .catch((e) => console.log);
  }, []);

  const setFeedbacks = (feedbacks) => {
    dispatch({
      type: "SET_FEEDBACKS",
      payload: feedbacks,
    });
  };

  /**
   * Sorts the feedback by the time they are committed
   */
  const sortByTime = (field) => function (a, b) {
    return b[field] - a[field];
  };

  /**
   * Sort the feedback by calculating it vote count.
   */
  const sortByVotes = (field) => function (a, b) {
    return b[field] - a[field];
  };

  const sortFeedbacks = (e) => {
    const allComments = state.feedbacks;
    let sortedArray = [];
    if (e == "1") {
      setSortButtonText("Sort By Time");
      sortedArray = allComments.sort(sortByTime('timestamp'));
    } else if (e == "2") {
      setSortButtonText("Sort By Votes Count");
      sortedArray = allComments.sort(sortByVotes('votes'));
    }
    setFeedbacks(sortedArray);
  };

  return (
    <div className="container">
      <br />
      <div className="FeedbackTab panel panel-default">
        <div className="panel-body">
          <h4>Post Feedback / Vote on Feedback</h4>
          <span>
            In this section, you can post feedback about this project's prototype (see "Run App" tab for more details), and also view feedback posted from other people.
            You can also up vote/down vote comments to signify their importance.
          </span>
          <hr />

          <FeedbackForm
            // onCommentSubmit={handleCommentSubmit}
            projectID={state.projectID}
            userID={state.userID}
            userName={state.userName}
          />

          <Dropdown style={{
            top: "-40px", float: "right", height: "20px", position: "relative",
          }}
          >
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {sortButtonText}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={sortFeedbacks.bind(this, "1")}>Sort by Time</Dropdown.Item>
              <Dropdown.Item onClick={sortFeedbacks.bind(this, "2")}>Sort by Votes Count</Dropdown.Item>
            </Dropdown.Menu>

          </Dropdown>

          <FeedbackList votedFeedbacks={state.votedFeedbacks ?? {}} />
        </div>
      </div>
    </div>
  );
};

export default FeedbackTab;
