import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentUserState } from "../stores/currentUser";
import { getToken, getUserFromStorage } from "../includes/auth";

const useUser = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const userFromStorage = getUserFromStorage();
  const token = getToken();

  useEffect(() => {
    if (!loading) {
      return;
    }

    if (userFromStorage) {
      setCurrentUser(userFromStorage);
    }
    setLoading(false);
  }, [loading, userFromStorage, setCurrentUser]);

  useEffect(() => {
    if (!token || !userFromStorage) {
      setCurrentUser(null);
    }
  }, [token, userFromStorage]);

  return {
    user: currentUser,
    loading,
  };
}

export default useUser;
