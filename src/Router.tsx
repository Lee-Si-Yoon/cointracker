import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coins from "./Routes/Coins";
import Coin from "./Routes/Coin";
import Price from "./Routes/Price";
import Chart from "./Routes/Chart";
import Nav from "./Components/Nav";

function Router() {
  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Nav />
        <Routes>
          <Route path="/*" element={<Coins />} />
          <Route path="/:coinId/*" element={<Coin />}>
            <Route path="price" element={<Price />} />
            <Route path="chart" element={<Chart />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;
