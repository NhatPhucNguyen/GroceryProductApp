import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Home from "./pages/Home";
import ProductCreate from "./pages/ProductCreate";
import ProductUpdate from "./pages/ProductUpdate";
import Category from "./pages/Category";
import Product from "./pages/Product";
import About from "./pages/About";

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="/" element={<Home />}/>
    <Route path="/products/add" element={<ProductCreate/>}/>
    <Route path="/products/:upc" element={<Product/>}/>
    <Route path="/products/:upc/update" element={<ProductUpdate/>}/>
    <Route path="/categories" element={<Category/>}/>
    <Route path="/about" element={<About/>}/>
  </>
))

function App() {  
  return <RouterProvider router={router}/>
}

export default App
