import { useRef, useState } from "react";

import "./styles.css";

const makeComment = (comment, children = []) => ({
  comment,
  children,
});

const CommentList = ({ comments, handleDeleteComment }) => {
  const [replyValue, setReplyValue] = useState("");
  const [showReplyField, setShowReplyField] = useState({
    show: false,
    index: -1,
  });

  const resetReplyField = () => {
    setShowReplyField({
      show: false,
      index: -1,
    });
    setReplyValue("");
  };

  const handleToggleReplyField = (index) => {
    setShowReplyField({ show: true, index });
  };

  const handleReplyValueChange = (e) => {
    if (e.target.value.toString().trim().length <= 0) return;
    setReplyValue(e.target.value);
  };

  const handleSubmitReply = () => {
    
  }

  const handleReplyKeyDown = (e) => {
    if (e.keyCode === 13) {
    }
  };

  return (
    <div className="comment-list">
      {comments.map((comment, index) => {
        return (
          <div className="comment-item" key={comment.comment + "-|-" + index}>
            <span className="comment-item__text">{comment.comment}</span>
            <div className="comment-actions">
              <span
                className="action-reply"
                onClick={() => handleToggleReplyField(index)}
              >
                Reply
              </span>
              <span
                className="action-delete"
                onClick={() => {
                  handleDeleteComment(index);
                  resetReplyField();
                }}
              >
                Delete
              </span>
            </div>

            {showReplyField.show && showReplyField.index === index ? (
              <div>
                <input
                  value={replyValue}
                  className="reply-field"
                  placeholder="Add a reply..."
                  onKeyDown={handleReplyKeyDown}
                  onChange={handleReplyValueChange}
                />
                <button>Reply</button>
              </div>
            ) : (
              <></>
            )}
          </div>
        );
      })}
    </div>
  );
};

const CommentWidget = () => {
  const [mainComment, setMainComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  const handleMainCommentChange = (e) => {
    if (e.target.value.toString().trim().length <= 0) return;
    setMainComment(e.target.value);
  };

  const handleMainCommentSubmit = () => {
    const result = [...allComments, makeComment(mainComment)];
    setAllComments([...result]);
    setMainComment("");
  };

  const handleMainCommentKeyDown = (e) => {
    if (e.keyCode === 13) handleMainCommentSubmit();
  };

  const handleDeleteComment = (index) => {
    const result = allComments.filter((_, idx) => idx !== index);
    setAllComments([...result]);
  };

  return (
    <div className="comment-widget-wrapper">
      <div className="main-comment-section">
        <textarea
          value={mainComment}
          placeholder="Add a comment..."
          onChange={handleMainCommentChange}
          onKeyDown={handleMainCommentKeyDown}
        />
        <button onClick={handleMainCommentSubmit}>Submit</button>
      </div>

      {allComments.length > 0 ? (
        <CommentList
          comments={allComments}
          handleDeleteComment={handleDeleteComment}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default CommentWidget;
