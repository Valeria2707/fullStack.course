import { useNavigate } from "react-router-dom";
import { useRequest } from "ahooks";
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
import useSetInitialUserData from "../../hooks/useSetInitialUserData";
import Notifications from "../../components/Notifications/Notifications";

const HomePage = () => {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  useSetInitialUserData();

  const {
    data: response,
    loading: isLoading,
    error,
    refresh,
  } = useRequest(getAllExhibitsAPI);

  const exhibits: Exhibit[] = response ? response.data.data : [];

  const { run: deletePost } = useRequest(deleteExhibitAPI, {
    manual: true,
    onSuccess: () => refresh(),
    onError: () => console.error("Помилка при видаленні поста"),
  });

  const handleDeletePost = (id: number) => {
    deletePost(id);
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
    data: exhibits,
    itemsPerPage: POSTS_PER_PAGE,
  });

  const handleRedirectToNewPostPage = () => navigate("/new-post");

  if (isLoading) return <div>Завантаження...</div>;

  if (error) return <div>Помилка: {error?.message || "Щось пішло не так"}</div>;

  return (
    <HomePageContainer>
      <ActionButtonsContainer>
        <ActionButton onClick={handleRedirectToNewPostPage}>
          Добавити новий пост
        </ActionButton>
        <ActionButton onClick={handleLogout}>Logout</ActionButton>
      </ActionButtonsContainer>
      <Header>Пости</Header>
      <Notifications />
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
