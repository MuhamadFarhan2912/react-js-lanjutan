import { BrowserRouter, Route, Routes } from "react-router-dom"

// Layouts
import PublicLayout from "./components/layouts/public"
import AdminLayout from "./components/layouts/admin"

// Public Pages
import Home from "./pages/public"
import Books from "./pages/public/books"

// Auth Pages
import Login from "./pages/auth/login"
import Register from "./pages/auth/register"

// Admin Pages
import Dashboard from "./pages/admin"
import AdminBooks from "./pages/admin/books"
import BookCreate from "./pages/admin/books/create"
import AdminGenres from "./pages/admin/genres"
import GenreCreate from "./pages/admin/genres/create"
import AdminAuthors from "./pages/admin/authors"
import AuthorCreate from "./pages/admin/authors/create"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public - ada Navbar & Footer */}
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="books" element={<Books />} />
        </Route>

        {/* Auth - tanpa Navbar & Footer */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Admin */}
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />

          <Route path="books">
            <Route index element={<AdminBooks />} />
            <Route path="create" element={<BookCreate />} />
          </Route>

          {/* Genre */}
          <Route path="genres">
            <Route index element={<AdminGenres />} />
            <Route path="create" element={<GenreCreate />} />
          </Route>

          {/* Author */}
          <Route path="authors">
            <Route index element={<AdminAuthors />} />
            <Route path="create" element={<AuthorCreate />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
