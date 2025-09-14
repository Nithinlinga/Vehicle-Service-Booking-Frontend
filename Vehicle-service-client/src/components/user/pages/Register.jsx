import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { TiTick } from "react-icons/ti";
import RegisterServices from '../../services/RegisterServices';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const api = import.meta.env.VITE_SERVER_URL;

    const [params] = useSearchParams();
    const role = params.get("role") || "User";

    const [serverError, setServerError] = useState("");
    // Local UI state
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    // Convenience flag for the tick

    const formik = useFormik({
        initialValues: {
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
            role: role.toLowerCase(),
        },
        // Validate on blur 
        validateOnBlur: true,
        validateOnChange: true,
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

            // Username
            if (!values.username) {
                errors.username = "Username required";
            } else if (["admin", "null", "god"].includes(values.username)) {
                errors.username = "Nice try";
            } else if (!/^[a-z]+$/.test(values.username)) {
                errors.username = "Must contain only lowercase letters";
            } else if (values.username.length < 8) {
                errors.username = "Must be at least 8 characters long";
            } else if (values.username.length > 50) {
                errors.username = "Cannot be more than 50 characters";
            }

            // Password
            if (!values.password) {
                errors.password = "Password required";
            } else if (values.password.length < 8) {
                errors.password = "Password must be at least 8 characters";
            }

            // Confirm Password
            if (!values.confirmPassword) {
                errors.confirmPassword = "Please confirm your password";
            } else if (values.password !== values.confirmPassword) {
                errors.confirmPassword = "Passwords do not match";
            }

            return errors;
        },
        onSubmit: async (values, { setSubmitting }) => {
            setServerError("");
            try {
                const response = await RegisterServices.addAuth(values);
                toast.success("Registration successful");
                navigate("/");
            } catch (error) {
                console.error("Submission failed:", error);
                const msg =
                    error?.response?.data?.message ||
                    error?.message ||
                    "Something went wrong";
                setServerError(msg);
                toast.error("Registration failed");
            } finally {
                setSubmitting(false);
            }
        },
    });

    const showTick =
        formik.values.password.length >= 8 &&
        formik.values.password === formik.values.confirmPassword
    console.log(showTick)
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 px-4">
            <div className="w-full max-w-3xl rounded-xl shadow-2xl bg-white/80 dark:bg-slate-900/70 backdrop-blur p-6 sm:p-8 md:p-10">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent dark:from-cyan-400 dark:to-indigo-400">
                    Sign Up
                </h2>

                {serverError && (
                    <div
                        role="alert"
                        className="mb-6 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/40 dark:bg-red-900/30 dark:text-red-200"
                    >
                        {serverError}
                    </div>
                )}

                <form
                    onSubmit={formik.handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5"
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
                        {/* Keep a fixed height so layout doesn't jump */}
                        <div id="email-error" className="h-5 mt-1">
                            {formik.touched.email && formik.errors.email && (
                                <span className="text-xs text-red-600">
                                    {formik.errors.email}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Username */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="username"
                            className="mb-1 text-sm font-medium text-slate-700 dark:text-slate-300"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="lowercaseusername"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                            autoComplete="username"
                            className="p-3 rounded border border-slate-300 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                            aria-invalid={Boolean(
                                formik.touched.username && formik.errors.username
                            )}
                            aria-describedby="username-error"
                        />
                        <div id="username-error" className="h-5 mt-1">
                            {formik.touched.username && formik.errors.username && (
                                <span className="text-xs text-red-600">
                                    {formik.errors.username}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Password */}
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
                                autoComplete="new-password"
                                className="p-3 pr-10 rounded border w-full border-slate-300 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                aria-invalid={Boolean(formik.touched.password && formik.errors.password)}
                                aria-describedby="password-error"
                            />

                            {/* Show/Hide toggle */}
                            <button
                                type="button"
                                onClick={() => setShowPassword((s) => !s)}
                                onMouseDown={(e) => e.preventDefault()} // keep input focus
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                aria-pressed={showPassword}
                                title={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
                            </button>
                        </div>

                        <div id="password-error" className="h-5 mt-1" aria-live="polite">
                            {formik.touched.password && formik.errors.password && (
                                <span className="text-xs text-red-600">{formik.errors.password}</span>
                            )}
                        </div>
                    </div>

                    {/* Confirm Password */}
                    {/* Confirm Password */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="confirmPassword"
                            className="mb-1 text-sm font-medium text-slate-700 dark:text-slate-300"
                        >
                            Confirm Password
                        </label>

                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder="••••••••"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.confirmPassword}
                                autoComplete="new-password"
                                className="p-3 pr-20 rounded border w-full border-slate-300 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-cyan-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                aria-invalid={Boolean(
                                    formik.touched.confirmPassword && formik.errors.confirmPassword
                                )}
                                aria-describedby="confirmPassword-error"
                            />

                            {/* Tick icon — positioned just left of the eye */}
                            <TiTick
                                color="green"
                                size={24}
                                className={[
                                    // Move left of the eye (eye is right-3)
                                    "absolute right-10 top-1/4 -translate-y-1/2 pointer-events-none",
                                    // Smooth animation; respects reduced motion
                                    "transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none",
                                    showTick ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95",
                                ].join(" ")}
                                aria-hidden={!showTick}
                                title={showTick ? "Passwords match" : ""}
                            />

                            {/* Show/Hide toggle (eye) */}
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword((s) => !s)}
                                onMouseDown={(e) => e.preventDefault()} // keep input focus
                                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white"
                                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                aria-pressed={showConfirmPassword}
                                title={showConfirmPassword ? "Hide password" : "Show password"}
                            >
                                {showConfirmPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
                            </button>
                        </div>


                        <div id="confirmPassword-error" className="h-5 mt-1" aria-live="polite">
                            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                <span className="text-xs text-red-600">
                                    {formik.errors.confirmPassword}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="w-full flex justify-center md:col-span-2 pt-2">
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
                                "Sign Up"
                            )}
                        </button>
                    </div>
                </form>

                <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link
                        to={`/login?role=${role}`}
                        className="text-green-600 hover:underline dark:text-green-400"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;