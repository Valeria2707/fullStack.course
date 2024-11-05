import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCommentsByPostIdAPI,
  deleteCommentAPI,
} from "../../api/commentActions";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Comment from "../Comment/Comment";
import { Comment as CommentProps } from "../../types/Comment";
import { CommentStripeContainer } from "./CommentStripe.styles";

const CommentStripe = ({ postId }: { postId: number }) => {
  const [showAddComment, setShowAddComment] = useState<boolean>(false);
  const currentUser = useSelector((state: RootState) => state.user.user);

  console.log(currentUser);
  const queryClient = useQueryClient();

  const {
    data: comments,
    isLoading,
    isError,
    error,
  } = useQuery<CommentProps[], Error>({
    queryKey: ["comments", postId],
    queryFn: () => getCommentsByPostIdAPI(postId).then((res) => res.data),
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: number) => deleteCommentAPI(postId, commentId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["comments", postId] }),
    onError: () => {
      console.error("Не вдалося видалити коментар");
    },
  });

  const handleDeleteComment = (commentId: number) => {
    deleteCommentMutation.mutate(commentId);
  };

  const handleAddCommentClick = () => {
    setShowAddComment(true);
  };

  if (isLoading) return <div>Завантаження коментарів...</div>;

  if (isError)
    return <div>{error?.message || "Не вдалося завантажити коментарі."}</div>;

  return (
    <CommentStripeContainer>
      <h3>Коментарі</h3>
      {comments && comments.length > 0 ? (
        <ul style={{ width: "100%" }}>
          {comments.map((comment) => (
            <li key={comment.id}>
              <strong>{comment.text}</strong>
              <p>Автор: {comment.user.username}</p>
              {currentUser &&
                comment.user.username === currentUser.userName && (
                  <button onClick={() => handleDeleteComment(comment.id)}>
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
          <Comment postId={postId} />
        </div>
      )}
    </CommentStripeContainer>
  );
};

export default CommentStripe;
