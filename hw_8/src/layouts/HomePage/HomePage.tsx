import { useNavigate, useSearchParams } from "react-router-dom";
import { useRequest } from "ahooks";
import { getAllExhibitsAPI, deleteExhibitAPI } from "../../api/exhibitActions";
import Post from "../../components/Post/Post";
import ReactPaginate from "react-paginate";
import { useLogoutMutation } from "../../api/userActions";
import {
  HomePageContainer,
  Header,
  ActionButtonsContainer,
  ActionButton,
  PaginationContainer,
} from "./HomePage.styles";
import useSetInitialUserData from "../../hooks/useSetInitialUserData";
import useNotifications from "../../hooks/useNotifications";
import { ToastContainer } from "react-toastify";
import { GetExhibitsResponse } from "../../types/Exhibit";
import { AxiosError } from "axios";

const HomePage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [logout] = useLogoutMutation();

  useSetInitialUserData();
  useNotifications();

  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const { data, loading, error, refresh } = useRequest<
    GetExhibitsResponse,
    AxiosError[]
  >(() => getAllExhibitsAPI(currentPage), { refreshDeps: [currentPage] });

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

  const handleRedirectToNewPostPage = () => navigate("/new-post");

  const handlePageChange = ({ selected }: { selected: number }) => {
    setSearchParams({ page: (selected + 1).toString() });
  };

  if (loading) return <div>Завантаження...</div>;

  if (error) return <div>Помилка: {error.message || "Щось пішло не так"}</div>;

  const currentExhibits = data?.data || [];
  const pageCount = data ? data.lastPage : 0;

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
          forcePage={currentPage - 1}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          containerClassName="pagination"
          activeClassName="active"
          previousLabel="Назад"
          nextLabel="Вперед"
        />
      </PaginationContainer>
    </HomePageContainer>
  );
};

export default HomePage;
