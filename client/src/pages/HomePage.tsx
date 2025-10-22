import { Outlet } from "react-router";
import Products from "../components/ProductsList";
function HomePage() {
  return (
    <div className="container main-container">
      <div className="split-container">
        <div className="scrollable-left">
          <Products />
        </div>
        <div className="fixed-right">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
