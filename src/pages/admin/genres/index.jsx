import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getGenres } from "../../../_services/genres";

export default function Genres() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGenres()
      .then((data) => setGenres(data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Genres</h1>

        <Link
          to="/admin/genres/create"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          + Create Genre
        </Link>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">No</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Description</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : genres.length > 0 ? (
              genres.map((genre, index) => (
                <tr key={genre.id} className="bg-white border-b">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{genre.name}</td>
                  <td className="px-6 py-4">{genre.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center">
                  Belum ada data genre.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}