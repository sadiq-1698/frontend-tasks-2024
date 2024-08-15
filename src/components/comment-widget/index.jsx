import { useEffect, useRef, useState } from "react";
import "./styles.css";

const makeComment = (comment, children = []) => {
  return {
    id: Date.now().toString(),
    comment,
    children,
  };
};

const DEFAULT_REPLY_FIELD_STATUS = {
  show: false,
  id: -1,
};

const CommentList = ({ comments, onReply, onDelete }) => {
  return (
    <div>
      {comments.map((comment) => {
        return (
          <CommentItem
            comment={comment}
            onReply={onReply}
            onDelete={onDelete}
          />
        );
      })}
    </div>
  );
};

const CommentItem = ({ comment, onReply, onDelete }) => {
  const replyRef = useRef();
  const [replyVal, setReplyVal] = useState("");
  const [replyField, setReplyField] = useState(DEFAULT_REPLY_FIELD_STATUS);

  const handleReplyClick = () => {
    setReplyField({
      id: comment.id,
      show: true,
    });
  };

  const handleReplyValChange = (e) => {
    if (e.target.value.toString().trim().length < 0) return;
    setReplyVal(e.target.value);
  };

  const handleSubmitReply = () => {
    onReply(comment.id, replyVal);
    setReplyVal("");
    setReplyField(DEFAULT_REPLY_FIELD_STATUS);
  };

  useEffect(() => {
    if (replyField.show) {
      replyRef?.current?.focus();
    }
  }, [replyField.show]);

  return (
    <div key={comment.id} className="comment-item-styles">
      <p className="comment-text-styles">{comment.comment}</p>
      <div className="comment-action-wrapper-styles">
        <span className="comment-action-styles" onClick={handleReplyClick}>
          Reply
        </span>
        <span
          className="comment-action-styles comment-action-styles-delete"
          onClick={() => onDelete(comment.id)}
        >
          Delete
        </span>
      </div>

      {replyField.show && replyField.id === comment.id && (
        <div className="reply-field-wrapper-styles">
          <input
            ref={replyRef}
            value={replyVal}
            className="reply-field-styles"
            placeholder="Reply to this comment..."
            onChange={handleReplyValChange}
            onKeyDown={(e) => (e.keyCode === 13 ? handleSubmitReply() : {})}
          />
          <button onClick={handleSubmitReply}>Submit</button>
        </div>
      )}

      {comment.children && comment.children.length > 0 && (
        <CommentList
          comments={comment.children}
          onDelete={onDelete}
          onReply={onReply}
        />
      )}
    </div>
  );
};

const CommentWidget = () => {
  const [allComments, setAllComments] = useState([]);
  const [mainComment, setMainComment] = useState("");

  const handleMainCommentChange = (e) => {
    if (e.target.value.toString().trim().length < 0) return;
    setMainComment(e.target.value);
  };

  const handleSubmitMainComment = () => {
    if (mainComment.toString().trim().length > 0)
      setAllComments((prev) => [...prev, makeComment(mainComment)]);
    setMainComment("");
  };

  const handleAddReply = (commentId, reply) => {
    const addReply = (comments) => {
      return comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            children: [...(comment.children || []), makeComment(reply)],
          };
        }
        if (comment.children) {
          return { ...comment, children: addReply(comment.children) };
        }
        return comment;
      });
    };

    setAllComments([...addReply(allComments)]);
  };

  const handleDeleteReply = (commentId) => {
    const deleteReply = (comments) => {
      return comments
        .map((comment) => {
          if (comment.id === commentId) {
            return null;
          }
          if (comment.children) {
            return { ...comment, children: deleteReply(comment.children) };
          }
          return comment;
        })
        .filter((comm) => comm);
    };

    setAllComments([...deleteReply(allComments)]);
  };

  return (
    <div className="comment-widget-wrapper-styles">
      <div className="main-comment-box-wrapper-styles">
        <input
          value={mainComment}
          placeholder="Add a comment..."
          className="main-comment-input-styles"
          onChange={handleMainCommentChange}
          onKeyDown={(e) => (e.keyCode === 13 ? handleSubmitMainComment() : {})}
        />
        <button onClick={handleSubmitMainComment}>Submit</button>
      </div>

      {allComments.length > 0 ? (
        <CommentList
          comments={allComments}
          onReply={handleAddReply}
          onDelete={handleDeleteReply}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default CommentWidget;
