import { useState } from "react";
import { X } from "./icons/Icons";

export default function SignUpModal({ onClose, onLocker }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const submit = () => {
    setErr("");

    if (!email.trim()) {
      setErr("Please enter your email.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErr("Please enter a valid email address.");
      return;
    }

    if (!password.trim()) {
      setErr("Please enter your password.");
      return;
    }

    if (password.length < 6) {
      setErr("Password must be at least 6 characters.");
      return;
    }

    onLocker();
  };

  return (
    <div
      className="fixed inset-0 z-[400] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#0c0c18] border border-white/10 rounded-2xl p-8 w-full max-w-sm mx-4"
        style={{ boxShadow: "0 0 60px rgba(99,102,241,0.15)" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
        >
          <X />
        </button>

        <div className="flex justify-center mb-5">
          <img
            src="/logo.png"
            alt="logo"
            className="w-12 h-12 rounded-xl"
          />
        </div>

        <h2 className="text-center text-white text-xl font-black mb-1">
          Join Beflix
        </h2>

        <p className="text-center text-white/40 text-sm mb-6">
          Create your account to continue
        </p>

        {err && (
          <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-3 mb-4">
            {err}
          </div>
        )}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="w-full bg-white/5 border border-white/10 focus:border-indigo-500/60 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none text-sm mb-3 transition-colors"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full bg-white/5 border border-white/10 focus:border-indigo-500/60 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none text-sm mb-4 transition-colors"
        />

        <button
          onClick={submit}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl text-sm transition-colors"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}