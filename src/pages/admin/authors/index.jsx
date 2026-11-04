
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAuthors,
  deleteAuthor,
} from "../../../_services/author";

export default function Authors() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAuthors = async () => {
    try {
      const data = await getAuthors();
      setAuthors(data);
    } catch (error) {
      console.error("Gagal mengambil data author:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Yakin ingin menghapus author ini?"
    );

    if (!confirmDelete) return;

    try {
      await deleteAuthor(id);

      setAuthors((prev) =>
        prev.filter((author) => author.id !== id)
      );

      alert("Author berhasil dihapus!");
    } catch (error) {
      console.error("Gagal menghapus author:", error);
      console.log("Respons server:", error.response?.data);
      alert("Gagal menghapus author!");
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900">
          Authors
        </h1>

        <Link
          to="/admin/authors/create"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          + Create Author
        </Link>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">No</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Country</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : authors.length > 0 ? (
              authors.map((author, index) => (
                <tr key={author.id} className="bg-white border-b">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{author.name}</td>
                  <td className="px-6 py-4">{author.country}</td>

                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Link
                        to={`/admin/authors/edit/${author.id}`}
                        className="text-white bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(author.id)}
                        className="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center">
                  Belum ada data author.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
