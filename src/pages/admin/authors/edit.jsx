
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  showAuthor,
  updateAuthor,
} from "../../../_services/author";

export default function AuthorEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    country: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const data = await showAuthor(id);

        setFormData({
          name: data.name || "",
          country: data.country || "",
        });
      } catch (error) {
        console.error("Gagal mengambil data author:", error);
        alert("Gagal mengambil data author!");
      } finally {
        setLoading(false);
      }
    };

    fetchAuthor();
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
      await updateAuthor(id, formData);

      alert("Author berhasil diperbarui!");
      navigate("/admin/authors");
    } catch (error) {
      console.error("Gagal update author:", error);
      console.log("Respons server:", error.response?.data);
      alert("Gagal memperbarui author!");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4 max-w-xl">
      <h1 className="text-2xl font-bold mb-5">Edit Author</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-2.5"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full border rounded-lg p-2.5"
            required
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-lg"
          >
            {submitting ? "Menyimpan..." : "Update Author"}
          </button>

          <Link
            to="/admin/authors"
            className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg"
          >
            Kembali
          </Link>
        </div>
      </form>
    </div>
  );
}
