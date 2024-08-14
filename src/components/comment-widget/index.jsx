import { useState } from "react";
import "./styles.css";

const makeComment = (comment, children = []) => ({
  id: Date.now().toString(), // Unique ID for each comment/reply
  comment,
  children,
});

const CommentItem = ({ comment, onReply, onDelete, isMain }) => {
  const [replyValue, setReplyValue] = useState("");
  const [showReplyField, setShowReplyField] = useState(false);

  const handleReplyToggle = () => setShowReplyField((prev) => !prev);

  const handleReplyChange = (e) => {
    setReplyValue(e.target.value);
  };

  const handleReplySubmit = () => {
    if (replyValue.trim()) {
      onReply(comment.id, replyValue.trim());
      setReplyValue("");
      setShowReplyField(false);
    }
  };

  const handleReplyKeyDown = (e) => {
    if (e.key === "Enter") handleReplySubmit();
  };

  return (
    <div className={`comment-item${isMain ? " main" : ""}`}>
      <span className="comment-item__text">{comment.comment}</span>
      <div className="comment-actions">
        <span className="action-reply" onClick={handleReplyToggle}>
          Reply
        </span>
        <span className="action-delete" onClick={() => onDelete(comment.id)}>
          Delete
        </span>
      </div>

      {showReplyField && (
        <div className="reply-field-wrapper">
          <input
            value={replyValue}
            className="reply-field"
            placeholder="Add a reply..."
            onChange={handleReplyChange}
            onKeyDown={handleReplyKeyDown}
            autoFocus
          />
          <button onClick={handleReplySubmit}>Reply</button>
        </div>
      )}

      {comment.children && comment.children.length > 0 && (
        <CommentList
          isMain={false}
          onReply={onReply}
          onDelete={onDelete}
          comments={comment.children}
        />
      )}
    </div>
  );
};

const CommentList = ({ comments, onReply, onDelete, isMain = true }) => {
  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <CommentItem
          isMain={isMain}
          key={comment.id}
          comment={comment}
          onReply={onReply}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

const CommentWidget = () => {
  const [mainComment, setMainComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  const handleMainCommentChange = (e) => {
    if (e.target.value.toString().trim()) setMainComment(e.target.value);
  };

  const handleMainCommentSubmit = () => {
    if (mainComment.trim()) {
      setAllComments([...allComments, makeComment(mainComment.trim())]);
      setMainComment("");
    }
  };

  const handleMainCommentKeyDown = (e) => {
    if (e.key === "Enter") handleMainCommentSubmit();
  };

  const handleReply = (parentId, reply) => {
    const addReply = (comments) => {
      return comments.map((comment) => {
        if (comment.id === parentId) {
          return {
            ...comment,
            children: [...(comment.children || []), makeComment(reply)],
          };
        }
        if (comment.children && comment.children.length > 0) {
          return { ...comment, children: addReply(comment.children) };
        }
        return comment;
      });
    };

    setAllComments(addReply(allComments));
  };

  const handleDelete = (commentId) => {
    const deleteComment = (comments) => {
      return comments
        .filter((comment) => comment.id !== commentId)
        .map((comment) => {
          if (comment.children && comment.children.length > 0) {
            return { ...comment, children: deleteComment(comment.children) };
          }
          return comment;
        });
    };

    setAllComments(deleteComment(allComments));
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

      {allComments.length > 0 && (
        <CommentList
          comments={allComments}
          onReply={handleReply}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default CommentWidget;
