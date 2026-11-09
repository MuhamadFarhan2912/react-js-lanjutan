import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { showBook } from "../../../_services/books";

export default function ShowBook() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

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

    if (id) {
      fetchBookDetail();
    }
  }, [id]);

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading...</div>;
  }

  if (!book) {
    return <div className="text-center py-20 text-gray-500">Buku tidak ditemukan.</div>;
  }

  return (
    <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16 items-start">
          
          {/* Kolom Kiri: Cover Foto Buku */}
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            <img
              className="w-full rounded-lg object-cover shadow-md"
              src={book.cover_photo ? `http://127.0.0.1:8000/storage/${book.cover_photo}` : "https://via.placeholder.com/400"}
              alt={book.title}
            />
          </div>

          {/* Kolom Kanan: Judul, Harga, Rating, Jumlah, Tombol, dan Deskripsi */}
          <div className="mt-6 sm:mt-8 lg:mt-0">
            
            {/* Judul Buku di Atas */}
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              {book.title}
            </h1>

            {/* Harga & Rating Bintang di Bawah Judul */}
            <div className="mt-3 flex flex-wrap items-center gap-4">
              <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                Rp {Number(book.price).toLocaleString("id-ID")}
              </p>

              <div className="flex items-center gap-2">
                <div className="flex items-center text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.399 8.168-7.333-3.854-7.333 3.854 1.399-8.168-5.934-5.787 8.2-1.192z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">(5.0)</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white underline cursor-pointer">
                  345 Reviews
                </span>
              </div>
            </div>

            {/* Input Jumlah & Tombol Beli */}
            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Jumlah
                </label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                />
              </div>

              <button
                type="button"
                onClick={() => alert(`Berhasil membeli ${quantity} buku!`)}
                className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-6 py-2.5 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800 shadow"
              >
                Beli
              </button>
            </div>

            <hr className="my-6 border-gray-200 dark:border-gray-800" />

            {/* Deskripsi Buku di Bagian Bawah */}
            <p className="text-gray-500 dark:text-gray-400 whitespace-pre-line leading-relaxed">
              {book.description || "Tidak ada deskripsi untuk buku ini."}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}