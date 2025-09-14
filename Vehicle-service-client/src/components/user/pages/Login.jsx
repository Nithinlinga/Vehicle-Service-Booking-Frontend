// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { login } from "../../../store/authSlice";
import LoginServices from '../../services/LoginServices';
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const api = import.meta.env.VITE_SERVER_URL;
  const [showPassword,setShowPassword]=useState(false);

  const [params] = useSearchParams();
  const role = params.get("role") || "User";

  const [serverError, setServerError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      role: role.toLowerCase(),
    },
    validateOnBlur: true,
    validateOnChange: false,
    validate: (values) => {
      const errors = {};

      // Email
      if (!values.email) {
        errors.email = "Email required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      // Password (keep simple for login)
      if (!values.password) {
        errors.password = "Password required";
      }

      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      setServerError("");
      try {
        const response = await LoginServices.postLogin(values);
        // Update store & local storage
        dispatch(login(response.data.user));
        localStorage.setItem("auth", JSON.stringify(response.data.user));
        toast.success("Login success");
        navigate("/");
      } catch (error) {
        console.error("Submission failed:", error);
        const msg =
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong";
        setServerError(msg);
        toast.error("Login failed");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 px-4">
      <div className="w-full max-w-md rounded-xl shadow-2xl bg-white/80 dark:bg-slate-900/70 backdrop-blur p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent dark:from-cyan-400 dark:to-indigo-400">
          {role} Login
        </h2>

        {serverError && (
          <div
            role="alert"
            aria-live="polite"
            className="mb-6 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/40 dark:bg-red-900/30 dark:text-red-200"
          >
            {serverError}
          </div>
        )}

        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-5"
          noValidate
        >
          {/* Email */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="mb-1 text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="you@example.com"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              autoComplete="email"
              className="p-3 rounded border border-slate-300 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              aria-invalid={Boolean(formik.touched.email && formik.errors.email)}
              aria-describedby="email-error"
            />
            {/* Fixed-height error container to avoid layout shift */}
            <div id="email-error" className="h-5 mt-1">
              {formik.touched.email && formik.errors.email && (
                <span className="text-xs text-red-600">
                  {formik.errors.email}
                </span>
              )}
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="mb-1 text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="••••••••"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                autoComplete="current-password"
                className="p-3 pr-10 rounded border border-slate-300 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white w-full"
                aria-invalid={Boolean(
                  formik.touched.password && formik.errors.password
                )}
                aria-describedby="password-error"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                {showPassword ? (
                  <IoIosEyeOff className="text-xl transition-all duration-300" />
                ) : (
                  <IoIosEye className="text-xl transition-all duration-300" />
                )}
              </button>
            </div>

            <div id="password-error" className="h-5 mt-1">
              {formik.touched.password && formik.errors.password && (
                <span className="text-xs text-red-600">
                  {formik.errors.password}
                </span>
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="inline-flex items-center justify-center rounded-md bg-cyan-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-600/30 transition hover:-translate-y-0.5 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {formik.isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Processing…
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
          <Link
            to={`/register?role=${role}`}
            className="text-green-600 hover:underline dark:text-green-400"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;