import { useState } from "react";
import { X } from "./icons/Icons";

export default function SignUpModal({ onClose, onLocker }) {
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const [codeErr, setCodeErr] = useState(false);

  const submit = () => {
    setErr("");
    setCodeErr(false);

    if (!username.trim()) {
      setErr("Please enter a username.");
      return;
    }

    if (code.trim()) {
      setCodeErr(true);
      return;
    }

    setErr("Invalid activation code. Get one below!");
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
            src="https://i.postimg.cc/8zFT9KCd/Picsart-25-12-30-01-10-09-699.png"
            alt="logo"
            className="w-12 h-12 rounded-xl"
          />
        </div>

        <h2 className="text-center text-white text-xl font-black mb-1">
          Join HiiMovie
        </h2>
        <p className="text-center text-white/40 text-sm mb-6">
          Create an account to start watching
        </p>

        {err && (
          <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-3 mb-4">
            {err}
          </div>
        )}

        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full bg-white/5 border border-white/10 focus:border-indigo-500/60 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none text-sm mb-3 transition-colors"
        />

        <input
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setCodeErr(false);
          }}
          placeholder="Activation Code"
          className={`w-full bg-white/5 border ${
            codeErr ? "border-red-500/60" : "border-white/10"
          } rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none text-sm mb-1 transition-colors`}
        />

        {codeErr && (
          <p className="text-red-400 text-xs mb-4 pl-1">
            The activation code is incorrect.
          </p>
        )}

        {!codeErr && <div className="mb-4" />}

        <button
          onClick={submit}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl text-sm mb-3 transition-colors"
        >
          Sign Up
        </button>

        <button
          onClick={onLocker}
          className="w-full border border-indigo-500/40 hover:border-indigo-500 text-indigo-400 hover:text-indigo-300 font-medium py-3 rounded-xl text-sm transition-all"
        >
          Get activation code →
        </button>
      </div>
    </div>
  );
}