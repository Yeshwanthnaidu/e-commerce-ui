import { useSelector } from "react-redux";
import Header from "./Components/Header";
import ProductSellingPage from "./Components/Product/ProductSelling";

function Home() {
  const showSellingModal = useSelector(
    (state) => state.mainSlice.showSellingModal
  );

  return (
    <div>
      {/* <Header /> */}
      {showSellingModal && <ProductSellingPage />}
    </div>
  );
}

export default Home;
