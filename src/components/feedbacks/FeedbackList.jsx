import { useContext } from 'react';
import Feedback from './Feedback';
import { FeedbackContext } from '../../contexts/feedback-context';

const FeedbackList = (props) => {
  const [state, dispatch] = useContext(FeedbackContext);
  const feedbackNodes = state.feedbacks.map((feedback, i) => (
    <Feedback
      key={i}
      feedbackID={feedback.feedbackID}
      userName={feedback.userName}
      created={feedback.created}
      votes={feedback.votes}
      projectID={feedback.projectID}
      userID={feedback.userID}
      upvoted={Object.keys(props.votedFeedbacks).includes(feedback.feedbackID)
			  && props.votedFeedbacks[feedback.feedbackID].voteValue === 1}
      downvoted={Object.keys(props.votedFeedbacks).includes(feedback.feedbackID)
			  && props.votedFeedbacks[feedback.feedbackID].voteValue === -1}
      voteID={Object.keys(props.votedFeedbacks).includes(feedback.feedbackID)
        ? props.votedFeedbacks[feedback.feedbackID].voteID : null}
    >
      {feedback.text}
    </Feedback>
  ));
  return <div className="commentList">{feedbackNodes}</div>;
};

export default FeedbackList;
