import { useSelector } from "react-redux";
import DealsCarousel from "./Components/HomePage/DealsCarousel";

function Home() {

  return (
    <div style={{minHeight: '87.5vh'}}>
      {/* {showSellingModal && <ProductSellingPage />} */}
      <DealsCarousel />
    </div>
  );
}

export default Home;
