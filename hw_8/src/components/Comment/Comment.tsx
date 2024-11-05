import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCommentAPI } from "../../api/commentActions";
import { CommentContainer } from "./Comment.styles";

const Comment = ({ postId }: { postId: number }) => {
  const [newComment, setNewComment] = useState<string>("");
  const queryClient = useQueryClient();

  const addCommentMutation = useMutation({
    mutationFn: (newComment: string) => createCommentAPI(postId, newComment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      setNewComment("");
    },
    onError: () => {
      console.error("Не вдалося додати коментар.");
    },
  });

  const handleAddComment = () => {
    if (newComment.trim()) {
      addCommentMutation.mutate(newComment);
    }
  };

  return (
    <CommentContainer>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Напишіть коментар"
      />
      <button
        onClick={handleAddComment}
        disabled={addCommentMutation.isPending}
      >
        {addCommentMutation.isPending ? "Збереження..." : "Зберегти"}
      </button>
    </CommentContainer>
  );
};

export default Comment;
