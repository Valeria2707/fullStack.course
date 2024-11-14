"use client";
import { useLogoutMutation } from "@/src/api/userActions";
import { Exhibit } from "@/src/types/Exhibit";
import { useRouter } from "next/navigation";
import Post from "@/src/components/Post/Post";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import {
  Header,
  LoginButton,
  PaginationContainer,
  StripePageContainer,
} from "@/app/page.styles";

interface Props {
  exhibits: Exhibit[];
  lastPage: number;
  page: number;
}

const StripeWidget = ({ exhibits, lastPage, page }: Props) => {
  const router = useRouter();
  const [logout] = useLogoutMutation();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const handleLoginRedirect = () => {
    router.push("/login");
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
    router.push(`/${newPage}`);
  };

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
          pageCount={lastPage}
          onPageChange={handlePageChange}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          containerClassName="pagination"
          activeClassName="active"
          forcePage={page - 1}
        />
      </PaginationContainer>
    </StripePageContainer>
  );
};

export default StripeWidget;
