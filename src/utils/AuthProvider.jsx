import { createContext, useContext, useState, useEffect } from "react";
import { account } from "../../appwriteConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loginUser = async (userInfo) => {
    setIsLoading(true);
    try {
      let response = await account.createEmailPasswordSession(
        userInfo.email,
        userInfo.password
      );
      console.log("SESSION:", response);
    } catch (error) {
      console.log(error);
    }
  };
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
      setUser(null);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loginUser, logOutUser, registerUser, isLoading }}
    >
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
