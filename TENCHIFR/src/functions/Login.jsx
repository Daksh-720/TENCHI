import { createPortal } from "react-dom";

function Login({ setAuthMode }) {

  function handleGoogleLogin() {
    window.location.href =
      "http://localhost:8080/oauth2/authorization/google";
  }

  function handleGithubLogin() {
    window.location.href =
      "http://localhost:8080/oauth2/authorization/github";
  }

  const modalContent = (
    <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">

      <div
        className="absolute inset-0"
        onClick={() => setAuthMode(null)}
      />

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/20 bg-[#121216] p-8 shadow-2xl">

        <button
          onClick={() => setAuthMode(null)}
          className="absolute right-4 top-4 text-xl text-white/60 hover:text-white cursor-pointer"
        >
          ✕
        </button>

        <h2 className="mb-6 text-center text-2xl font-semibold text-white">
          Login
        </h2>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Enter Email..."
            className="h-12 w-full rounded-xl border border-white/20 bg-white/10 px-4 text-white outline-none placeholder:text-white/50 focus:border-[#00D2FF]/60"
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            className="h-12 w-full rounded-xl border border-white/20 bg-white/10 px-4 text-white outline-none placeholder:text-white/50 focus:border-[#00D2FF]/60"
          />
        </div>

        <button
          className="w-full cursor-pointer rounded-xl border-2 border-[#00D2FF]/60 bg-[#A78BFA]/20 py-3 font-semibold text-white transition hover:bg-[#737FF2]/40"
        >
          Login
        </button>

        {/* OAuth Divider */}
        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/20" />

          <span className="text-sm text-white/40">
            OR
          </span>

          <div className="h-px flex-1 bg-white/20" />
        </div>

        {/* Google & GitHub */}
        <div className="flex gap-3">

          <button
            onClick={handleGoogleLogin}
            className="flex-1 cursor-pointer rounded-xl border border-white/20 bg-white/10 py-3 font-semibold text-white transition hover:bg-white/20"
          >
            Google
          </button>

          <button
            onClick={handleGithubLogin}
            className="flex-1 cursor-pointer rounded-xl border border-white/20 bg-white/10 py-3 font-semibold text-white transition hover:bg-white/20"
          >
            GitHub
          </button>

        </div>

      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

export default Login;