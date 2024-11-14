import { useSelector } from "react-redux";
import { Exhibit } from "../../types/Exhibit";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import CommentStripe from "../CommentStripe/CommentStripe";
import axiosInstance from "../../api/axiosInstance";
import { PostContainer } from "./Post.styles";
import Image from "next/image";

interface PostProps {
  exhibit: Exhibit;
  onDelete?: (id: number) => void;
}

const Post = ({ exhibit, onDelete }: PostProps) => {
  const baseURL = axiosInstance.defaults.baseURL;
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const user = useSelector((state: RootState) => state.user.user);

  const [open, setOpen] = useState(false);

  const handleOpenComment = () => setOpen(!open);

  const handleDeletePost = () => {
    if (onDelete) onDelete(exhibit.id);
  };

  return (
    <PostContainer>
      <p>{exhibit.description}</p>
      {exhibit.imageUrl && (
        <div className="post-images">
          <Image
            src={`${baseURL}${exhibit.imageUrl}`}
            alt="Зображення експонату"
            width={150}
            height={150}
          />
        </div>
      )}
      {token && exhibit.user.username === user?.userName && (
        <button onClick={handleDeletePost}>Видалити пост</button>
      )}
      {token && (
        <button onClick={handleOpenComment}>
          {open ? "Закрити коментарі" : "Відкрити коментарі"}
        </button>
      )}
      {token && open && <CommentStripe postId={exhibit.id} />}
    </PostContainer>
  );
};

export default Post;
