import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { UserResponse } from "../types/User";
import { setUser } from "../store/slices/userSlice";

const useSetInitialUserData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");

    if (token && userName) {
      const user: UserResponse = {
        userName,
        access_token: token,
      };

      dispatch(setUser(user));
    }
  }, [dispatch]);
};

export default useSetInitialUserData;
