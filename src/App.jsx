import "./App.css"
import React, { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Sidebar from "./components/Sidebar/Sidebar"
import Add from "./pages/Add/Add"
import List from "./pages/List/List"
import Orders from "./pages/Orders/Orders"
import ImageList from "./pages/ImageList/ImageList"
import Login from "./components/Login/Login"
export const backendURL = import.meta.env.VITE_BACKEND_URL
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import View from "./pages/ViewPage/View"
export const currency = "$"
export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "");
  useEffect(() => {
    localStorage.setItem("token", token)
  }, [token])
  return (
    <>
      <ToastContainer />
      {
        token === "" ?
          <Login setToken={setToken} />
          :
          <BrowserRouter>
            <Navbar setToken={setToken} />
            <div className="adminContainer">
              <Sidebar />
              <div className="container">
                <Routes>
                  <Route path="/add" element={<Add token={token} />} />
                  <Route path="/list" element={<List token={token} />} />
                  <Route path="/orders" element={<Orders token={token} />} />
                  <Route path="/imageList" element={<ImageList token={token} />} />
                  <Route path="/view/:imgId" element={<View />} />
                </Routes>
              </div>
            </div>
          </BrowserRouter>
      }
    </>
  )
}