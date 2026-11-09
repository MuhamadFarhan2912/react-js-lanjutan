
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Layouts
import PublicLayout from "./components/layouts/public";
import AdminLayout from "./components/layouts/admin";
import ProtectedRoute from "./components/ProtectedRoute";

// Public Pages
import Home from "./pages/public";
import Books from "./pages/public/books";
import ShowBook from "./pages/public/books/show";

// Auth Pages
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";

// Admin Pages
import Dashboard from "./pages/admin";
import AdminBooks from "./pages/admin/books";
import BookCreate from "./pages/admin/books/create";
import BookEdit from "./pages/admin/books/edit";

import AdminGenres from "./pages/admin/genres";
import GenreCreate from "./pages/admin/genres/create";
import GenreEdit from "./pages/admin/genres/edit";

import AdminAuthors from "./pages/admin/authors";
import AuthorCreate from "./pages/admin/authors/create";
import AuthorEdit from "./pages/admin/authors/edit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Halaman Publik */}
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="books" element={<Books />} />
          <Route path="books/show/:id" element={<ShowBook />} />
        </Route>

        {/* Halaman Auth */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Halaman Admin - Hanya untuk role admin */}
        <Route
          path="admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />

          {/* Books */}
          <Route path="books">
            <Route index element={<AdminBooks />} />
            <Route path="create" element={<BookCreate />} />
            <Route path="edit/:id" element={<BookEdit />} />
          </Route>

          {/* Genres */}
          <Route path="genres">
            <Route index element={<AdminGenres />} />
            <Route path="create" element={<GenreCreate />} />
            <Route path="edit/:id" element={<GenreEdit />} />
          </Route>

          {/* Authors */}
          <Route path="authors">
            <Route index element={<AdminAuthors />} />
            <Route path="create" element={<AuthorCreate />} />
            <Route path="edit/:id" element={<AuthorEdit />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
