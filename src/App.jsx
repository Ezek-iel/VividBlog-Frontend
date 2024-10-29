import { LandingPage, SignupPage, BlogsPage, SingleBlogPage, SingleUserPage, LoginPage } from "./pages"
import { BrowserRouter, Routes, Route } from "react-router-dom"


export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:id" element={<SingleBlogPage />} />
        <Route path="/users/:id" element={<SingleUserPage />} />
        {/* <Route path="/create" element={<CreateBlogPage/>} /> */}
      </Routes>
    </BrowserRouter>
  )
}