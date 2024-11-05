import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllExhibitsAPI, deleteExhibitAPI } from "../../api/exhibitActions";
import Post from "../../components/Post/Post";
import { Exhibit } from "../../types/Exhibit";
import ReactPaginate from "react-paginate";
import { useLogoutMutation } from "../../api/userActions";
import usePagination from "../../hooks/usePagination";
import { POSTS_PER_PAGE } from "../../constants/pagination";
import {
  HomePageContainer,
  Header,
  ActionButtonsContainer,
  ActionButton,
  PaginationContainer,
} from "./HomePage.styles";

const HomePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [logout] = useLogoutMutation();

  const {
    data: exhibits,
    isLoading,
    isError,
    error,
  } = useQuery<Exhibit[], Error>({
    queryKey: ["exhibits"],
    queryFn: async () => {
      const response = await getAllExhibitsAPI();
      return response.data.data;
    },
  });

  const deleteMutation = useMutation<number, Error, number>({
    mutationFn: deleteExhibitAPI,
    onSuccess: (deletedId) => {
      queryClient.setQueryData<Exhibit[]>(["exhibits"], (oldData) =>
        oldData ? oldData.filter((exhibit) => exhibit.id !== deletedId) : []
      );
    },
    onError: () => {
      console.error("Помилка при видаленні поста");
    },
  });

  const handleDeletePost = (id: number) => {
    deleteMutation.mutate(id);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch {
      console.error("Помилка при виході");
    }
  };

  const {
    currentData: currentExhibits,
    pageCount,
    handlePageChange,
  } = usePagination<Exhibit>({
    data: exhibits || [],
    itemsPerPage: POSTS_PER_PAGE,
  });

  const handleRedirectToNewPostPage = () => navigate("/new-post");

  if (isLoading) return <div>Завантаження...</div>;

  if (isError)
    return <div>Помилка: {error?.message || "Щось пішло не так"}</div>;

  return (
    <HomePageContainer>
      <ActionButtonsContainer>
        <ActionButton onClick={handleRedirectToNewPostPage}>
          Добавити новий пост
        </ActionButton>
        <ActionButton onClick={handleLogout}>Logout</ActionButton>
      </ActionButtonsContainer>
      <Header>Мої пости</Header>
      {currentExhibits.length === 0 ? (
        <div>Немає доступних постів.</div>
      ) : (
        currentExhibits.map((exhibit) => (
          <Post
            key={exhibit.id}
            exhibit={exhibit}
            onDelete={handleDeletePost}
          />
        ))
      )}
      <PaginationContainer>
        <ReactPaginate
          pageCount={pageCount}
          onPageChange={handlePageChange}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          containerClassName="pagination"
          activeClassName="active"
        />
      </PaginationContainer>
    </HomePageContainer>
  );
};

export default HomePage;
