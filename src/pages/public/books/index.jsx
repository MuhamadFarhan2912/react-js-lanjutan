import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBooks } from "../../../_services/books";

export default function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const booksData = await getBooks();
        // Sesuaikan jika data dibungkus di dalam objek response (misal: booksData.data)
        setBooks(Array.isArray(booksData) ? booksData : booksData.data || []);
      } catch (error) {
        console.error("Gagal mengambil data buku:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        
        {/* Grid List Buku */}
        <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
          {books.length > 0 ? (
            books.map((book) => (
              <div
                key={book.id || book._id}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 flex flex-col justify-between"
              >
                <div>
                  {/* Cover Buku */}
                  <div className="h-56 w-full overflow-hidden rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <Link to={`/books/show/${book.id || book._id}`}>
                      <img
                        className="mx-auto h-full object-cover"
                        src={
                          book.cover_photo
                            ? `http://127.0.0.1:8000/storage/${book.cover_photo}`
                            : "https://via.placeholder.com/200"
                        }
                        alt={book.title}
                      />
                    </Link>
                  </div>

                  {/* Informasi Buku */}
                  <div className="pt-6">
                    <Link
                      to={`/books/show/${book.id || book._id}`}
                      className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white line-clamp-2"
                    >
                      {book.title}
                    </Link>

                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      Author: {book.author?.name || "Unknown"}
                    </p>
                  </div>
                </div>

                {/* Harga dan Tombol */}
                <div className="pt-4">
                  <div className="mt-4 flex items-center justify-between gap-4">
                    <p className="text-xl font-extrabold leading-tight text-gray-900 dark:text-white">
                      Rp {Number(book.price).toLocaleString("id-ID")}
                    </p>

                    <Link
                      to={`/books/show/${book.id || book._id}`}
                      className="inline-flex items-center rounded-lg bg-indigo-700 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                    >
                      Detail
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 dark:text-gray-400 py-10">
              No books found
            </p>
          )}
        </div>

        {/* Tombol Show More (Opsional) */}
        <div className="w-full text-center mt-8">
          <button
            type="button"
            className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-indigo-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
          >
            Show more
          </button>
        </div>

      </div>
    </section>
  );
}