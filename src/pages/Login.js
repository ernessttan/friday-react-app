/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginInfo);
    try {
      fetch("http://localhost:4000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      }).then(() => {
        // navigate to home page
        navigate("/home");
      });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <main>
      <h1 className="text-orange-500 mt-[15vh]">
        <span className="text-black">Welcome Back</span>
        <br />
        Let's go!
      </h1>
      <p className="text-red-500">{errorMessage}</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 my-5">
        <label htmlFor="email" className="text-sm">
          Email
          <input
            onChange={handleChange}
            name="email"
            type="email"
            value={loginInfo.email}
            placeholder="Email"
            className="auth-input"
          />
        </label>

        <label htmlFor="password" className="text-sm">
          Password
          <input
            onChange={handleChange}
            name="password"
            type="text"
            value={loginInfo.password}
            className="auth-input"
          />
        </label>
        <button type="submit" className="action-btn w-full my-3">
          Login
        </button>
      </form>
    </main>
  );
}

export default Login;
