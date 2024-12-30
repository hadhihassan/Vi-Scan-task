import { Route, Routes } from "react-router-dom"
import NavBar from "../components/NavBar";
import Home from "../pages/BlogListPage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import ViewPage from "../pages/ViewPage";
import ProfilePage from "../pages/ProfilePage";
// import NavBar from "../pages/ProfilePage";
// import NavBar from "../pages/ViewPage";



export default function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/blog/:id" element={<ViewPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<div>404</div>} />
        {/* <Route path="/settings" element={authUser ? <SettingsPage /> : <Navigate to="/login" />} /> */}
        {/* <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} /> */}
      </Routes>

    </div >
  );
}