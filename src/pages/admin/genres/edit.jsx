
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showGenre, updateGenre } from "../../../_services/genres";

export default function GenreEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchGenre = async () => {
      try {
        const response = await showGenre(id);

        setFormData({
          name: response.name || "",
          description: response.description || "",
        });
      } catch (error) {
        console.error("Gagal mengambil genre:", error);
        console.log(
          "RESPONS SERVER:",
          JSON.stringify(error.response?.data, null, 2)
        );
        alert("Gagal mengambil data genre!");
      } finally {
        setLoading(false);
      }
    };

    fetchGenre();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await updateGenre(id, formData);

      console.log("HASIL UPDATE:", response);

      alert("Genre berhasil diperbarui!");
      navigate("/admin/genres");
    } catch (error) {
      console.error("Gagal memperbarui genre:", error);

      console.log(
        "RESPONS SERVER:",
        JSON.stringify(error.response?.data, null, 2)
      );

      alert("Gagal memperbarui genre!");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p className="p-4">Loading...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Edit Genre
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Genre Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2.5"
              placeholder="Masukkan nama genre"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Description
            </label>

            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2.5"
              placeholder="Masukkan deskripsi genre"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="text-white bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 rounded-lg px-5 py-2.5"
            >
              {submitting ? "Menyimpan..." : "Update Genre"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/genres")}
              className="text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg px-5 py-2.5"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
