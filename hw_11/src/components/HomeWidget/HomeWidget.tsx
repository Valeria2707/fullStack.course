"use client";
import { deleteExhibitAPI } from "@/src/api/exhibitActions";
import { useLogoutMutation } from "@/src/api/userActions";
import useNotifications from "@/src/hooks/useNotifications";
import useSetInitialUserData from "@/src/hooks/useSetInitialUserData";
import { Exhibit } from "@/src/types/Exhibit";
import { useRequest } from "ahooks";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import Post from "@/src/components/Post/Post";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import {
  ActionButton,
  ActionButtonsContainer,
  Header,
  HomePageContainer,
  PaginationContainer,
} from "@/app/home/page.styles";

interface Props {
  initialExhibits: Exhibit[];
  lastPage: number;
  page: number;
}

const HomeWidget = ({ initialExhibits, lastPage, page }: Props) => {
  const router = useRouter();
  const [logout] = useLogoutMutation();
  const [exhibits, setExhibits] = useState<Exhibit[]>(initialExhibits);

  useSetInitialUserData();
  useNotifications();

  const { run: deletePost } = useRequest(deleteExhibitAPI, {
    manual: true,
    onSuccess: (deletedId: number) => {
      setExhibits((prevExhibits) =>
        prevExhibits.filter((exhibit) => exhibit.id !== deletedId)
      );
    },
    onError: () => console.error("Помилка при видаленні поста"),
  });

  const handleDeletePost = (id: number) => {
    deletePost(id);
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch {
      console.error("Помилка при виході");
    }
  };

  const handlePageChange = () => {
    const newPage = page + 1;
    router.push(`/home/${newPage}`);
  };

  const handleRedirectToNewPostPage = () => router.push("/new-post");

  return (
    <HomePageContainer>
      <ToastContainer position="top-center" />
      <ActionButtonsContainer>
        <ActionButton onClick={handleRedirectToNewPostPage}>
          Добавити новий пост
        </ActionButton>
        <ActionButton onClick={handleLogout}>Logout</ActionButton>
      </ActionButtonsContainer>
      <Header>Пости</Header>
      {exhibits.length === 0 ? (
        <div>Немає доступних постів.</div>
      ) : (
        exhibits.map((exhibit) => (
          <Post
            key={exhibit.id}
            exhibit={exhibit}
            onDelete={handleDeletePost}
          />
        ))
      )}
      <PaginationContainer>
        <ReactPaginate
          pageCount={lastPage}
          onPageChange={handlePageChange}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          containerClassName="pagination"
          activeClassName="active"
          forcePage={page - 1}
        />
      </PaginationContainer>
    </HomePageContainer>
  );
};

export default HomeWidget;
