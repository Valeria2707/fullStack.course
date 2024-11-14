import { useState } from "react";
import { useRequest } from "ahooks";
import {
  getCommentsByPostIdAPI,
  deleteCommentAPI,
} from "../../api/commentActions";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Comment from "../Comment/Comment";
import { CommentStripeContainer } from "./CommentStripe.styles";
import { Comment as CommentProps } from "../../types/Comment";

const CommentStripe = ({ postId }: { postId: number }) => {
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [showAddComment, setShowAddComment] = useState<boolean>(false);
  const currentUser = useSelector((state: RootState) => state.user.user);

  const { loading: isLoading, error } = useRequest(
    () => getCommentsByPostIdAPI(postId).then((res) => res.data),
    {
      onSuccess: (data) => setComments(data),
    }
  );

  const { run: deleteComment, loading: isDeleting } = useRequest(
    async (commentId: number) => {
      await deleteCommentAPI(postId, commentId);
      return commentId;
    },
    {
      manual: true,
      onSuccess: (deletedCommentId: number) =>
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== deletedCommentId)
        ),
      onError: () => console.error("Не вдалося видалити коментар"),
    }
  );

  const handleAddComment = (newComment: CommentProps) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  const handleDeleteComment = (commentId: number) => {
    deleteComment(commentId);
  };

  const handleAddCommentClick = () => {
    setShowAddComment(true);
  };

  if (isLoading) return <div>Завантаження коментарів...</div>;

  if (error)
    return <div>{error.message || "Не вдалося завантажити коментарі."}</div>;

  return (
    <CommentStripeContainer>
      <h3>Коментарі</h3>
      {comments.length > 0 ? (
        <ul style={{ width: "100%" }}>
          {comments.map((comment: CommentProps) => (
            <li key={comment.id}>
              <strong>{comment.text}</strong>
              <p>Автор: {comment.user.username}</p>
              {currentUser &&
                comment.user.username === currentUser.userName && (
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    disabled={isDeleting}
                  >
                    Видалити
                  </button>
                )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Коментарів поки немає.</p>
      )}
      {!showAddComment && (
        <button onClick={handleAddCommentClick}>Додати коментар</button>
      )}

      {showAddComment && (
        <div style={{ width: "80%" }}>
          <Comment postId={postId} onAddComment={handleAddComment} />
        </div>
      )}
    </CommentStripeContainer>
  );
};

export default CommentStripe;
