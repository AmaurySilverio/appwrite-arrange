import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loginUser = (userInfo) => {};
  const logOutUser = () => {};
  const registerUser = (userInfo) => {};
  const checkUserStatus = () => {};

  const contextData = {
    user,
    loginUser,
    logOutUser,
    registerUser,
  };

  useEffect(() => {
    setTimeout(() => {
      setUser(true);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export default AuthProvider;
