import { useContext } from 'react';
import Comment from './Comment';
import { CommentContext } from '../../contexts/comment-context';

const CommentList = (props) => {
  const [state, dispatch] = useContext(CommentContext);
  const commentNodes = state.feedbacks.map((comment, i) => (
    <Comment
      key={i}
      feedbackID={comment.feedbackID}
      userName={comment.userName}
      created={comment.created}
      votes={comment.votes}
      projectID={comment.projectID}
      userID={comment.userID}
      upvoted={Object.keys(props.votedComments).includes(comment.feedbackID)
			  && props.votedComments[comment.feedbackID].voteValue === 1}
      downvoted={Object.keys(props.votedComments).includes(comment.feedbackID)
			  && props.votedComments[comment.feedbackID].voteValue === -1}
      voteID={Object.keys(props.votedComments).includes(comment.feedbackID)
        ? props.votedComments[comment.feedbackID].voteID : null}
    >
      {comment.text}
    </Comment>
  ));
  return <div className="commentList">{commentNodes}</div>;
};

export default CommentList;
