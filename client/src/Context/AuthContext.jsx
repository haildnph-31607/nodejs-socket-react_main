import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/services";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [registerError, setRegisterError] = useState("");
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [resgisterInfor, setResgisterInfor] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginInfor, setLoginInfor] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    const users = localStorage.getItem("User");
    setUser(JSON.parse(users));
  }, []);

  const logoutUser = useCallback(() => {
    localStorage.removeItem("User");
    setUser({});
  }, []);

  const updateRegisterInfor = useCallback((infor) => {
    setResgisterInfor(infor);
  }, []);
  const updateLoginInfor = useCallback((infor) => {
    setLoginInfor(infor);
  }, []);
  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsRegisterLoading(true);
      setRegisterError(null);
      const response = await postRequest(
        `${baseUrl}/platform/register`,
        JSON.stringify(resgisterInfor)
      );
      setIsRegisterLoading(false);
      if (response.error) {
        return setRegisterError(response);
      }
      localStorage.setItem("User", JSON.stringify(response));
      setUser(response);
    },
    [resgisterInfor]
  );

 
  const Login = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoginLoading(true);
      setLoginError(null);
      const response = await postRequest(
        `${baseUrl}/platform/login`,
        JSON.stringify(loginInfor)
      );
      setIsLoginLoading(false);
      if (response.error) {
        return setLoginError(response);
      }
      localStorage.setItem("User", JSON.stringify(response));
      setUser(response);
    },
    [loginInfor]
  );
  return (
    <AuthContext.Provider
      value={{
        logoutUser,
        user,
        resgisterInfor,
        updateRegisterInfor,
        registerUser,
        registerError,
        isRegisterLoading,
        loginError,
        loginInfor,
        Login,
        updateLoginInfor,
        isLoginLoading

      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
