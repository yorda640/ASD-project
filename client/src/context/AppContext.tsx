import axios from "axios";
import { createContext, ReactNode, useContext, useState } from "react";
import { API_URI } from "../config/env";

type ApplicationContextType = {
  products: object[];
  getProducts: (url: string) => Promise<void>;
  addProduct: (data: {
    name: string;
    description: string;
    category: string;
    price: number;
  }) => Promise<void>;
};

const ApplicationContext = createContext<ApplicationContextType>(
  {} as ApplicationContextType
);

export default function AppContext({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<object[]>([]);

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

  async function addProduct(data: {
    name: string;
    description: string;
    category: string;
    price: number;
  }) {
    try {
      const response = await axios.post(`${API_URI}/products`, data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ApplicationContext.Provider value={{ products, getProducts, addProduct }}>
      {children}
    </ApplicationContext.Provider>
  );
}

export const useApplicationContext = () => useContext(ApplicationContext);
