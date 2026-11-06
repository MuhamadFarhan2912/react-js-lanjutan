
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../_services/auth";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Validasi field kosong
    if (!name || !username || !email || !password || !confirmPassword) {
      setError("Semua field wajib diisi.");
      return;
    }

    // Validasi format email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setError("Format email tidak valid.");
      return;
    }

    // Validasi password
    if (password.length < 8) {
      setError("Password minimal harus 8 karakter.");
      return;
    }

    // Validasi konfirmasi password
    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak sama.");
      return;
    }

    setLoading(true);

    try {
      const data = await register({
        name,
        username,
        email,
        password,
      });

      if (data.success) {
        setSuccess("Registrasi berhasil! Silakan login.");

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setError(data.message || "Registrasi gagal.");
      }
    } catch (err) {
      const response = err.response?.data;

      if (response?.message && typeof response.message === "object") {
        const firstError = Object.values(response.message)[0];
        setError(Array.isArray(firstError) ? firstError[0] : firstError);
      } else {
        setError(
          response?.message || "Registrasi gagal. Silakan coba lagi."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg dark:bg-gray-800 dark:border dark:border-gray-700">
        <div className="p-6 space-y-5 sm:p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Create an Account
            </h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Daftar untuk mulai menggunakan BookSales
            </p>
          </div>

          {error && (
            <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 text-sm text-green-700 bg-green-100 rounded-lg">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama lengkap"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 8 karakter"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Konfirmasi Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Ulangi password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50"
            >
              {loading ? "Processing..." : "Register"}
            </button>

            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
              Sudah punya akun?{" "}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
              >
                Login di sini
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
