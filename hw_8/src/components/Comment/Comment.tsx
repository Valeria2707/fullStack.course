import { useState } from "react";
import { useRequest } from "ahooks";
import { createCommentAPI } from "../../api/commentActions";
import { Comment as CommentProps } from "../../types/Comment";
import { CommentContainer } from "./Comment.styles";

interface Props {
  postId: number;
  onAddComment: (newComment: CommentProps) => void;
}

const Comment = ({ postId, onAddComment }: Props) => {
  const [newCommentText, setNewCommentText] = useState<string>("");

  const { run: addComment, loading: isAdding } = useRequest(
    (text: string) => createCommentAPI(postId, text).then((res) => res.data),
    {
      manual: true,
      onSuccess: (newComment) => {
        onAddComment(newComment);
        setNewCommentText("");
      },
      onError: () => console.error("Не вдалося додати коментар"),
    }
  );

  const handleAddComment = () => {
    if (newCommentText.trim()) {
      addComment(newCommentText);
    }
  };

  return (
    <CommentContainer>
      <textarea
        value={newCommentText}
        onChange={(e) => setNewCommentText(e.target.value)}
        placeholder="Напишіть коментар"
      />
      <button onClick={handleAddComment} disabled={isAdding}>
        {isAdding ? "Збереження..." : "Зберегти"}
      </button>
    </CommentContainer>
  );
};

export default Comment;
