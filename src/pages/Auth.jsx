import { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [tab, setTab] = useState("login");

  return (
    <div className=" w-96 py-8 mx-auto mt-64">
      <div className="w-full flex justify-center gap-4">
        <button
          className={
            tab === "login"
              ? "bg-slate-500 px-8 py-2 text-white"
              : "border border-slate-500 px-8 py-2 text-slate-500"
          }
          onClick={() => setTab("login")}
        >
          Login
        </button>
        <button
          className={
            tab === "signup"
              ? "bg-slate-500 px-8 py-2 text-white"
              : "border border-slate-500 px-8 py-2 text-slate-500"
          }
          onClick={() => setTab("signup")}
        >
          Sign Up
        </button>
      </div>
      {tab === "login" && <FormLogin />}
      {tab === "signup" && <FormSignup />}
    </div>
  );
}

function FormLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch("http://94.74.86.174:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        const authToken = data.data.token;
        setToken(authToken);
        console.log("Token:", authToken);
        navigate("/checklist");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <form
      className="w-[300px] mx-auto flex flex-col gap-4 mt-4"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Username"
        className="w-full p-4 border border-slate-400 rounded-lg"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-4 border border-slate-400 rounded-lg"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="w-full bg-slate-500 text-white">Continue</button>
    </form>
  );
}

function FormSignup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      email: email,
      username: username,
      password: password,
    };

    try {
      const response = await fetch("http://94.74.86.174:8080/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        console.log("Registration successful");
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <form
      className="w-[300px] mx-auto flex flex-col gap-4 mt-4"
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        placeholder="Email"
        className="w-full p-4 border border-slate-400 rounded-lg"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Username"
        className="w-full p-4 border border-slate-400 rounded-lg"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-4 border border-slate-400 rounded-lg"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="w-full bg-slate-500 text-white">Register</button>
    </form>
  );
}

export default Auth;
