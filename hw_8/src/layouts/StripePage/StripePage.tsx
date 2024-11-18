import { useRequest } from "ahooks";
import { getAllExhibitsAPI } from "../../api/exhibitActions";
import Post from "../../components/Post/Post";
import ReactPaginate from "react-paginate";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  StripePageContainer,
  PaginationContainer,
  Header,
  LoginButton,
} from "./StripePage.styles";
import { useLogoutMutation } from "../../api/userActions";
import { GetExhibitsResponse } from "../../types/Exhibit";
import { AxiosError } from "axios";

const StripePage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const token = localStorage.getItem("token");
  const [logout] = useLogoutMutation();

  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const { data, loading, error } = useRequest<
    GetExhibitsResponse,
    AxiosError[]
  >(() => getAllExhibitsAPI(currentPage), { refreshDeps: [currentPage] });

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

  const handlePageChange = (selectedItem: { selected: number }) => {
    const newPage = selectedItem.selected + 1;
    setSearchParams({ page: String(newPage) });
  };

  if (loading) return <div>Завантаження...</div>;

  if (error) return <div>Помилка: {error?.message || "Сталася помилка"}</div>;

  const exhibits = data?.data || [];
  const pageCount = data?.lastPage || 0;

  return (
    <StripePageContainer>
      {token ? (
        <LoginButton onClick={handleLogout}>logout</LoginButton>
      ) : (
        <LoginButton onClick={handleLoginRedirect}>login</LoginButton>
      )}
      <Header>Пости</Header>
      {exhibits.length === 0 ? (
        <div>Немає доступних постів.</div>
      ) : (
        exhibits.map((exhibit) => <Post key={exhibit.id} exhibit={exhibit} />)
      )}
      <PaginationContainer>
        <ReactPaginate
          pageCount={pageCount}
          forcePage={currentPage - 1}
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
