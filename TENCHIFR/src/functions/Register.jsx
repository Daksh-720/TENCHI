import { createPortal } from "react-dom";
import { useState } from "react";


function Register({ setAuthMode }) {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


async function handleRegister(){
  setError("");
  setSuccess("");

  if(!username || !email || !password || !confirmPassword){
    setError("Please fill All Fields!");
    return;
  }
  if(password !== confirmPassword){
    setError("Passwords do not match");
    return;
  }


  const response = await fetch("http://localhost:8080/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password
    }),
  });

  if(!response.ok) {
    const message = await response.text();
    setError(message);
    return;
  }

  const data = await response.json();
  setSuccess(`Registration Successful! Welcome ${data.username}.`);
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
          Register
        </h2>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="h-12 w-full rounded-xl border border-white/20 bg-white/10 px-4 text-white outline-none placeholder:text-white/50 focus:border-[#00D2FF]/60"
          />
        </div>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 w-full rounded-xl border border-white/20 bg-white/10 px-4 text-white outline-none placeholder:text-white/50 focus:border-[#00D2FF]/60"
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 w-full rounded-xl border border-white/20 bg-white/10 px-4 text-white outline-none placeholder:text-white/50 focus:border-[#00D2FF]/60"
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="h-12 w-full rounded-xl border border-white/20 bg-white/10 px-4 text-white outline-none placeholder:text-white/50 focus:border-[#00D2FF]/60"
          />
        </div>

        <button
         onClick={handleRegister}
         className="w-full cursor-pointer rounded-xl border-2 border-[#00D2FF]/60 bg-[#A78BFA]/20 py-3 font-semibold text-white transition hover:bg-[#737FF2]/40">
          Register
        </button>

        {error && (
          <p className="mt-4 text-center text-sm text-red-400">
            {error}
          </p>
        )}


        {success && (
          <p className="mt-4 text-center text-sm text-green-400">
            {success}
          </p>
        )}


      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

export default Register;
