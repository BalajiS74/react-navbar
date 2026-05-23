import "./App.css";
import { Route, RouterProvider, Routes } from "react-router-dom";
import {
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./components/Login";
import Sign from "./components/Sign";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home label="User🐳" />}></Route>
        <Route path="about" element={<About />}></Route>
        <Route path="blogs" element={<Blogs />}></Route>
        <Route path="contact" element={<Contact />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/sign" element={<Sign />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Route>,
    ),
  );
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
