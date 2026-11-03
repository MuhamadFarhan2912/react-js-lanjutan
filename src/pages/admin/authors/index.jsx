
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuthors } from "../../../_services/author";

export default function Authors() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAuthors()
      .then((data) => setAuthors(data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Authors</h1>

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
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : authors.length > 0 ? (
              authors.map((author, index) => (
                <tr key={author.id} className="bg-white border-b">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{author.name}</td>
                  <td className="px-6 py-4">{author.country}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center">
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
