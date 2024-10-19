import { LandingPage, SignupPage, BlogsPage, SingleBlogPage } from "./pages"
import { BrowserRouter, Routes, Route } from "react-router-dom"


export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/blogs" element={<BlogsPage/>}/>
        <Route path="/blogs/:id" element={<SingleBlogPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}