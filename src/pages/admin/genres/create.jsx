
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createGenre } from "../../../_services/genres";

export default function GenreCreate() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await createGenre({ name, description });
      alert("Genre berhasil ditambahkan!");
      navigate("/admin/genres");
    } catch (err) {
      setError(
        err.response?.data?.message || "Gagal menambahkan genre."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Create Genre
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Genre Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="Enter genre name"
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Description
            </label>
            <textarea
              id="description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="Enter genre description"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 mb-4">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Genre"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/genres")}
            className="ml-2 text-gray-900 bg-gray-200 hover:bg-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
