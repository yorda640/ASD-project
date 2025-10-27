import { useApplicationContext } from "../context/AppContext";

export const useAuth = () => {
  const {
    user,
    token,
    isLoading,
    login,
    register,
    logout,
    getProfile,
    isAuthenticated,
  } = useApplicationContext();

  return {
    user,
    token,
    isLoading,
    login,
    register,
    logout,
    getProfile,
    isAuthenticated,
  };
};
