// Authentication Hook
import { useCallback, useEffect, useState } from "react";

function useAuth() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [firstName, setFirstName] = useState(null);

  const login = useCallback((firstName, userId, token) => {
    setFirstName(firstName);
    setToken(token);
    setUserId(userId);
    localStorage.setItem(
      "authUser",
      JSON.stringify({
        firstName,
        userId,
        token,
      }),
    );
  }, []);

  // Triggered only when logged in
  useEffect(() => {
    const storedData = localStorage.getItem("authUser");
    if (storedData) {
      const { firstName, userId, token } = JSON.parse(storedData);
      login(firstName, userId, token);
    }
  }, [login]);

  const logout = useCallback(() => {
    setFirstName(null);
    setToken(null);
    setUserId(null);
    localStorage.removeItem("authUser");
  }, []);

  return {
    login, logout, token, userId, firstName,
  };
}

export default useAuth;
