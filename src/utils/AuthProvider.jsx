import { createContext, useContext, useState, useEffect } from "react";
import { account } from "../../appwriteConfig";
import { ID } from "appwrite";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // setTimeout(() => {
    checkUserStatus();
    // }, 1000);
  }, []);

  const loginUser = async (userInfo) => {
    setIsLoading(true);
    try {
      let response = await account.createEmailPasswordSession(
        userInfo.email,
        userInfo.password
      );
      let accountDetails = await account.get();

      console.log("accountDetails:", accountDetails);
      console.log("SESSION:", response);
      setUser(accountDetails);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const logOutUser = () => {
    account.deleteSession("current");
    setUser(null);
  };

  const registerUser = async (userInfo) => {
    setIsLoading(true);
    try {
      let response = await account.create(
        ID.unique(),
        userInfo.email,
        userInfo.password1,
        userInfo.name
      );
      await account.createEmailPasswordSession(
        userInfo.email,
        userInfo.password1
      );
      let accountDetails = await account.get();

      console.log("accountDetails:", accountDetails);
      setUser(accountDetails);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  const checkUserStatus = async () => {
    try {
      let accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  const contextData = {
    user,
    loginUser,
    logOutUser,
    registerUser,
  };

  return (
    <AuthContext.Provider
      value={{ user, loginUser, logOutUser, registerUser, isLoading }}
    >
      {isLoading ? <p>Loading...</p> : children}
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
