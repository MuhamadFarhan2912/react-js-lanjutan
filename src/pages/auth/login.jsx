
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../_services/auth";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      // Memanggil API Login Laravel
      const data = await login({
        email: email.trim(),
        password,
      });

      // Memastikan data login tersedia
      if (!data.success || !data.token || !data.user) {
        setError(data.message || "Login gagal.");
        return;
      }

      // Memeriksa role pengguna
      const role = data.user.role;

      if (role !== "admin" && role !== "customer") {
        setError("Role pengguna tidak dikenali.");
        return;
      }

      // Menyimpan token dan informasi pengguna
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Mengarahkan pengguna berdasarkan role
      if (role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }

    } catch (err) {
      const message = err.response?.data?.message;

      if (typeof message === "string") {
        setError(message);
      } else {
        setError("Login gagal. Periksa email dan password.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0">

        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">

          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>

            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit}
            >

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>

                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@company.com"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>

              {/* Pesan Error */}
              {error && (
                <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">
                  {error}
                </div>
              )}

              {/* Terms and Conditions */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-indigo-300"
                    required
                  />
                </div>

                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-indigo-600 hover:underline"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>

              {/* Button Login */}
              <button
                type="submit"
                disabled={loading}
                className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Loading..." : "Login"}
              </button>

              {/* Link Register */}
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to="/register"
                  className="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
                >
                  Sign up
                </Link>
              </p>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
