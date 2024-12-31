import { Navigate, Route, Routes } from "react-router-dom"
import NavBar from "../src/components/NavBar";
import Home from "../src/pages/BlogListPage";
import LoginPage from "../src/pages/LoginPage";
import SignUpPage from "../src/pages/SignUpPage";
import ViewPage from "../src/pages/ViewPage";
import ProfilePage from "../src/pages/ProfilePage";
import React from "react";
import { AuthContext } from "./Context/AuthContext";
// import NavBar from "../pages/ProfilePage";
// import NavBar from "../pages/ViewPage";
import { Toaster } from 'react-hot-toast';



export default function App() {

  const { authUser, updateAuthenticity } = React.useContext(AuthContext);
  React.useEffect(() => {
    updateAuthenticity()
  }, [])

  return (<div>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<ViewPage />} />

        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />

        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </div>

  );
}
