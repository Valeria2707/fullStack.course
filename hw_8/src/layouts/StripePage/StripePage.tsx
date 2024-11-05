import { useQuery } from "@tanstack/react-query";
import { getAllExhibitsAPI } from "../../api/exhibitActions";
import Post from "../../components/Post/Post";
import { Exhibit } from "../../types/Exhibit";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import usePagination from "../../hooks/usePagination";
import { POSTS_PER_PAGE } from "../../constants/pagination";
import {
  StripePageContainer,
  PaginationContainer,
  Header,
  LoginButton,
} from "./StripePage.styles";
import { useLogoutMutation } from "../../api/userActions";

const StripePage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [logout] = useLogoutMutation();

  const { data, isLoading, isError, error } = useQuery<Exhibit[], Error>({
    queryKey: ["exhibits"],
    queryFn: async () => {
      const response = await getAllExhibitsAPI();
      return response.data.data;
    },
  });

  const {
    currentData: currentExhibits,
    pageCount,
    handlePageChange,
  } = usePagination<Exhibit>({
    data,
    itemsPerPage: POSTS_PER_PAGE,
  });

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch {
      console.error("Помилка при виході");
    }
  };

  if (isLoading) return <div>Завантаження...</div>;

  if (isError) return <div>Помилка: {error?.message || "Сталася помилка"}</div>;

  return (
    <StripePageContainer>
      {token ? (
        <LoginButton onClick={handleLogout}>logout</LoginButton>
      ) : (
        <LoginButton onClick={handleLoginRedirect}>login</LoginButton>
      )}
      <Header>Пости</Header>
      {currentExhibits.length === 0 ? (
        <div>Немає доступних постів.</div>
      ) : (
        currentExhibits.map((exhibit) => (
          <Post key={exhibit.id} exhibit={exhibit} />
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
    </StripePageContainer>
  );
};

export default StripePage;
