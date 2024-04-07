import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="home" element={<HomePage />} />
      <Route path="pricing" element={<Pricing />} />
      <Route path="product" element={<Product />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
