"use client";

import { useState } from "react";
import { toast } from "react-toastify";

const NewsLetterForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Thanks for subscribing! Check your inbox for updates.");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-2 border-b border-base-content/30 pb-2 focus-within:border-base-content">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          aria-label="Your email address"
          className="w-full bg-transparent text-sm outline-none placeholder:text-base-content/50"
        />
        <button
          type="submit"
          aria-label="Subscribe to the newsletter"
          className="btn btn-ghost btn-xs p-2 shadow-none hover:bg-transparent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-base-content"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 12h14m-6-6 6 6-6 6"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default NewsLetterForm;
