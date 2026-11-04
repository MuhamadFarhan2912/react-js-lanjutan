import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { showBook } from "../../../_services/books"; // Sesuaikan path service Anda

export default function ShowBook() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const data = await showBook(id);
        setBook(data);
      } catch (error) {
        console.error("Gagal memuat detail buku:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetail();
  }, [id]);

  if (loading) {
    return <div className="text-center py-20 text-white">Loading...</div>;
  }

  if (!book) {
    return <div className="text-center py-20 text-white">Buku tidak ditemukan.</div>;
  }

  return (
    <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          
          {/* Cover Photo Buku */}
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            <img
              className="w-full rounded-lg object-cover"
              src={book.cover_photo ? `http://127.0.0.1:8000/storage/${book.cover_photo}` : "https://via.placeholder.com/400"}
              alt={book.title}
            />
          </div>

          {/* Informasi Buku */}
          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              {book.title}
            </h1>

            <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
              <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                Rp {Number(book.price).toLocaleString("id-ID")}
              </p>
            </div>

            {/* Info Tambahan (Author & Genre jika ada relasinya di backend) */}
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <p><span className="font-semibold">Author:</span> {book.author?.name || "Unknown"}</p>
              <p><span className="font-semibold">Genre:</span> {book.genre?.name || "General"}</p>
              <p><span className="font-semibold">Stock:</span> {book.stock} pcs</p>
            </div>

            <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
              <button
                type="button"
                className="text-white mt-4 sm:mt-0 bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800 flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 -ms-2 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                  />
                </svg>
                Add to cart
              </button>
            </div>

            <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

            {/* Deskripsi Buku */}
            <p className="text-gray-500 dark:text-gray-400 whitespace-pre-line">
              {book.description || "Tidak ada deskripsi untuk buku ini."}
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
}