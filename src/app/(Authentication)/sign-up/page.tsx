"use client";

import { signIn, signUp } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // Password validation function
  const validatePassword = (password: string): string | null => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordError("");

    const form = new FormData(e.currentTarget);
    const user = Object.fromEntries(form.entries());
    const password = user.password as string;

    // Validate password
    const validationError = validatePassword(password);
    if (validationError) {
      setPasswordError(validationError);
      return; // Stop form submission if invalid
    }

    setLoading(true);

    console.log(user);

    try {
      const { data, error } = await signUp.email({
        name: user.name as string,
        email: user.email as string,
        password: password,
        image: user.photoUrl as string,
      });

      if (error) {
        toast.error(error.message || "Sign Up Failed");
        return;
      }

      if (data) {
        toast.success("Sign Up Successful!");
        router.push("/sign-in");
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const googleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const { error } = await signIn.social({
        provider: "google",
        callbackURL: "/", // Authenticate and navigate to Home page
      });

      if (error) {
        toast.error(error.message || "Google Sign In Failed");
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to sign in with Google.");
    }
  };

  return (
    <div className="hero min-h-screen" style={{ backgroundColor: "#FAF9F3" }}>
      <div className="hero-content w-full max-w-md">
        <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
          <div className="card-body p-8">
            <form onSubmit={handleSubmit}>
              <fieldset className="fieldset">
                <label className="label" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  className="input w-full"
                  id="name"
                  name="name"
                  placeholder="Name"
                  required
                />

                <label className="label mt-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  className="input w-full"
                  id="email"
                  name="email"
                  placeholder="Email"
                  required
                />

                <label className="label mt-2" htmlFor="photoUrl">
                  Photo URL
                </label>
                <input
                  type="text"
                  className="input w-full"
                  id="photoUrl"
                  name="photoUrl"
                  placeholder="Photo URL"
                />

                <label className="label mt-2" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  className={`input w-full ${passwordError ? "input-error" : ""}`}
                  id="password"
                  name="password"
                  placeholder="Password"
                  onChange={() => setPasswordError("")} // Clear error when typing
                  required
                />

                {/* Password validation error message display */}
                {passwordError && (
                  <p className="text-red-500 text-xs mt-1">{passwordError}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn mt-6 w-full text-white"
                  style={{ backgroundColor: "#1F2D22" }}
                >
                  {loading ? "Signing Up..." : "Sign Up"}
                </button>
              </fieldset>

              <div className="divider text-xs text-gray-500 my-4">OR</div>

              {/* Social Login (Google) */}
              <button
                type="button"
                onClick={googleSignIn}
                className="btn btn-outline w-full"
                style={{ color: "#1F2D22", borderColor: "#1F2D22" }}
              >
                Log in with Google
              </button>

              {/* Navigation link to Login page */}
              <div className="mt-4 text-center text-sm">
                <p>
                  Have an account?{" "}
                  <Link
                    href="/sign-in"
                    className="link font-semibold"
                    style={{ color: "#1F2D22" }}
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
