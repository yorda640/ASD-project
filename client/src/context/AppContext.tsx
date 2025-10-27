import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { API_URI } from "../config/env";

// Types
type User = {
  id: string;
  username: string;
  email: string;
};

type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  createdAt?: string;
  updatedAt?: string;
};

type AuthResponse = {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
};

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

type LoginData = {
  email: string;
  password: string;
};

type RegisterData = {
  username: string;
  email: string;
  password: string;
};

type AddProductData = {
  name: string;
  description: string;
  category: string;
  price: number;
};

type ApplicationContextType = {
  // Products
  products: Product[];
  getProducts: (url: string) => Promise<void>;
  addProduct: (data: AddProductData) => Promise<void>;
  productsLoading: boolean;
  productsError: string | null;

  // Authentication
  user: User | null;
  token: string | null;
  isLoading: boolean;
  authError: string | null;
  login: (data: LoginData) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  getProfile: () => Promise<void>;
  isAuthenticated: boolean;
};

const ApplicationContext = createContext<ApplicationContextType>(
  {} as ApplicationContextType
);

export default function AppContext({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productsError, setProductsError] = useState<string | null>(null);

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Set auth token in axios headers
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  // Get user profile on app start if token exists
  useEffect(() => {
    if (token) {
      // getProfile();
      console.log("Token exists, fetch user profile", token);
    }
  }, [token]); // Added token as dependency

  // Check if user is authenticated
  const isAuthenticated = !!token;

  // Products functions
  // async function getProducts(url: string) {
  //   try {
  //     setProductsLoading(true);
  //     setProductsError(null);
  //     setProducts([]);

  //     const response = await axios.get<ApiResponse<Product[]>>(url);

  //     if (response.data.success) {
  //       setProducts(response.data.data);
  //     } else {
  //       throw new Error(response.data.message || "Failed to fetch products");
  //     }
  //   } catch (error: any) {
  //     const errorMessage =
  //       error.response?.data?.message ||
  //       error.message ||
  //       "Failed to fetch products";
  //     setProductsError(errorMessage);
  //     console.error("Get products error:", errorMessage);
  //     throw new Error(errorMessage);
  //   } finally {
  //     setProductsLoading(false);
  //   }
  // }
  async function getProducts(url: string) {
    try {
      setProducts([]);
      console.log(url);
      const results = await axios.get(url);
      setProducts(results.data);
      console.log(results.data);
    } catch (e) {
      console.log(e);
    }
  }

  async function addProduct(data: AddProductData): Promise<void> {
    try {
      setProductsError(null);
      const response = await axios.post<ApiResponse<Product>>(
        `${API_URI}/products`,
        data
      );

      if (response.data.success) {
        // Add the new product to the existing products list
        setProducts((prev) => [...prev, response.data.data]);
      } else {
        throw new Error(response.data.message || "Failed to add product");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to add product";
      setProductsError(errorMessage);
      console.error("Add product error:", errorMessage);
      throw new Error(errorMessage);
    }
  }

  // Authentication functions
  async function login(loginData: LoginData): Promise<boolean> {
    try {
      setIsLoading(true);
      setAuthError(null);

      const response = await axios.post<AuthResponse>(
        `${API_URI}/auth/login`,
        loginData
      );

      if (response.data.success) {
        const { user: userData, token: authToken } = response.data.data;
        setUser(userData);
        setToken(authToken);
        return true;
      } else {
        throw new Error(response.data.message || "Login failed");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "Login failed";
      setAuthError(errorMessage);
      console.error("Login error:", errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  async function register(registerData: RegisterData): Promise<boolean> {
    try {
      setIsLoading(true);
      setAuthError(null);

      const response = await axios.post<AuthResponse>(
        `${API_URI}/auth/register`,
        registerData
      );

      if (response.data.success) {
        const { user: userData, token: authToken } = response.data.data;
        setUser(userData);
        setToken(authToken);
        return true;
      } else {
        throw new Error(response.data.message || "Registration failed");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "Registration failed";
      setAuthError(errorMessage);
      console.error("Registration error:", errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  // async function getProfile(): Promise<void> {
  //   try {
  //     setIsLoading(true);
  //     setAuthError(null);

  //     const response = await axios.get<ApiResponse<{ user: User }>>(
  //       `${API_URI}/auth/me`
  //     );

  //     if (response.data.success) {
  //       setUser(response.data.data.user);
  //     } else {
  //       throw new Error(response.data.message || "Failed to get profile");
  //     }
  //   } catch (error: any) {
  //     const errorMessage =
  //       error.response?.data?.message ||
  //       error.message ||
  //       "Failed to get profile";
  //     setAuthError(errorMessage);
  //     console.error("Get profile error:", errorMessage);
  //     logout(); // Logout on profile fetch failure
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  function logout(): void {
    setUser(null);
    setToken(null);
    setAuthError(null);
    localStorage.removeItem("token");
  }

  const value: ApplicationContextType = {
    // Products
    products,
    getProducts,
    addProduct,
    productsLoading,
    productsError,

    // Authentication
    user,
    token,
    isLoading,
    authError,
    login,
    register,
    logout,
    // getProfile,
    isAuthenticated,
  };

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
}

export const useApplicationContext = () => {
  const context = useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error("useApplicationContext must be used within an AppContext");
  }
  return context;
};
