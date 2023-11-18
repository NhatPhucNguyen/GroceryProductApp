import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Home from "./pages/Home";
import ProductCreate from "./pages/ProductCreate";
import ProductUpdate from "./pages/ProductUpdate";

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="/" element={<Home />}/>
    <Route path="/products/add" element={<ProductCreate/>}/>
    <Route path="/products/:upc/update" element={<ProductUpdate/>}/>
  </>
))

function App() {  
  return <RouterProvider router={router}/>
}

export default App
