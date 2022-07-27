// Authentication Hook
import { useCallback, useEffect, useState } from "react";

function useAuth() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = useCallback((userId, token) => {
    setToken(token);
    setUserId(userId);
    localStorage.setItem(
      "authUser",
      JSON.stringify({
        userId,
        token,
      }),
    );
  }, [token]);

  // Triggered only when logged in
  useEffect(() => {
    const storedData = localStorage.getItem("authUser");
    if (storedData) {
      const { userId, token } = JSON.parse(storedData);
      login(userId, token);
    }
  }, [login]);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("authUser");
  }, []);

  return {
    login, logout, token, userId,
  };
}

export default useAuth;
