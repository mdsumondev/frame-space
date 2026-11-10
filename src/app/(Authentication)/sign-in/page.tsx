"use client";

import { signIn } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const SignInPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl =
    searchParams.get("callbackUrl") || searchParams.get("redirect") || "/";

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Email & Password Sign In
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    const form = new FormData(e.currentTarget);
    const userInfo = Object.fromEntries(form.entries());

    try {
      const { data, error } = await signIn.email({
        email: userInfo.email as string,
        password: userInfo.password as string,
        rememberMe: true,
        callbackURL: callbackUrl,
      });

      if (error) {
        setErrorMessage(
          error.message || "Sign in failed. Please check your credentials.",
        );
      } else if (data) {
        router.push(callbackUrl);
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Google Social Sign In
  const handleGoogleSignIn = async () => {
    setErrorMessage(null);
    try {
      await signIn.social({
        provider: "google",
        callbackURL: callbackUrl,
      });
    } catch (err) {
      setErrorMessage("Failed to initiate Google sign in.");
    }
  };

  return (
    <div className="hero min-h-screen" style={{ backgroundColor: "#FAF9F3" }}>
      <div className="hero-content w-full max-w-md">
        <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
          <div className="card-body p-8">
            {/* Error Message Display */}
            {errorMessage && (
              <div className="alert alert-error text-sm p-3 rounded-lg mb-2">
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <fieldset className="fieldset">
                <label className="label" htmlFor="email">
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

                <label className="label mt-2" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  className="input w-full"
                  id="password"
                  name="password"
                  placeholder="Password"
                  required
                />

                <button
                  type="submit"
                  className="btn mt-6 w-full text-white"
                  style={{ backgroundColor: "#1F2D22" }}
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </button>
              </fieldset>
            </form>

            <div className="divider text-xs text-gray-500 my-4">OR</div>

            {/* Google Sign-in Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="btn btn-outline w-full"
              style={{ color: "#1F2D22", borderColor: "#1F2D22" }}
              disabled={isLoading}
            >
              Log in with Google
            </button>

            <div className="text-center mt-4 text-sm">
              <p>
                Have no account?{" "}
                <Link
                  href="/sign-up"
                  className="link font-semibold"
                  style={{ color: "#1F2D22" }}
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
