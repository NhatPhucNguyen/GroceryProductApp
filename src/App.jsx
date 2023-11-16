import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Home from "./pages/Home";
import ProductCreate from "./pages/ProductCreate";

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="/" element={<Home />}/>
    <Route path="/products/add" element={<ProductCreate/>}/>
  </>
))

function App() {  
  return <RouterProvider router={router}/>
}

export default App
