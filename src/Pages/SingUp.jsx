import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
    const { createUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Handle form submit
    const handleSignUp = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const photoURL = e.target.photoURL.value;
        const password = e.target.password.value;

        // Password Validation
        const uppercase = /[A-Z]/.test(password);
        const lowercase = /[a-z]/.test(password);
        if (!uppercase || !lowercase || password.length < 6) {
            return Swal.fire({
                icon: "error",
                title: "Invalid Password",
                html: `
          Password must contain:<br/>
          - At least one Uppercase letter<br/>
          - At least one Lowercase letter<br/>
          - Minimum 6 characters
        `,
            });
        }

        setLoading(true);

        // Create user
        createUser(email, password)
            .then(() => {
                // Update profile with name & photo
                return updateUserProfile(name, photoURL);
            })
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Registration Successful!",
                    text: "Your account has been created.",
                    timer: 1500,
                    showConfirmButton: false,
                });
                navigate("/login");
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Registration Failed!",
                    text: error.message,
                });
            })
            .finally(() => setLoading(false));
    };

    // Google Login
    const handleGoogleLogin = () => {
        setLoading(true);
        signInWithGoogle()
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Google Login Successful!",
                    text: "Welcome!",
                    timer: 1500,
                    showConfirmButton: false,
                });
                navigate("/");
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Login Failed!",
                    text: error.message,
                });
            })
            .finally(() => setLoading(false));
    };

    return (
        <section className="flex justify-center -mt-[50px] items-center min-h-screen bg-white">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-10 border border-gray-100">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Create an Account
                </h2>

                {/* Sign Up Form */}
                <form onSubmit={handleSignUp} className="space-y-5">
                    {/* Name */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f47000]"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f47000]"
                        />
                    </div>

                    {/* Photo URL */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Photo URL</label>
                        <input
                            type="text"
                            name="photoURL"
                            placeholder="Enter photo URL"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f47000]"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f47000]"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                            Must have Uppercase, Lowercase & min 6 characters
                        </p>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#f47000] text-white py-2 rounded-lg font-semibold hover:bg-[#d65f00] transition"
                    >
                        {loading ? "Registering..." : "Sign Up"}
                    </button>
                </form>

                {/* Google Login */}
                <div className="mt-6">
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full flex justify-center items-center gap-3 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
                    >
                        <FcGoogle className="text-2xl" />
                        <span className="font-medium text-gray-700">Continue with Google</span>
                    </button>
                </div>

                {/* Login Link */}
                <p className="text-center text-gray-600 mt-6">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-[#f47000] font-medium hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default SignUp;
