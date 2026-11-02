"use client";

import Link from "next/link";
import React from "react";

const SignInPage = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {};

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  id="email"
                  name="email"
                  placeholder="Email"
                />

                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  id="password"
                  name="password"
                  placeholder="Password"
                />

                <button type="submit" className="btn btn-neutral mt-4">
                  Sign In
                </button>
              </fieldset>

              <p>Or</p>

              <button> Log in with Google </button>
              <div>
                <p>
                  Have no account? <Link href="/sign-up">Sign up</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
