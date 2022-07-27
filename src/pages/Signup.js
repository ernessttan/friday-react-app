/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [signUpInfo, setSignUpInfo] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setSignUpInfo({
      ...signUpInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:4000/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpInfo),
      })
        .then((res) => res.json())
        .then((userData) => {
          localStorage.setItem("token", userData.token);
          navigate("/home");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <h1 className="text-orange-500 mt-[15vh]">
        <span className="text-black">Let's get</span>
        <br />
        Started.
      </h1>
      <p className="text-red-500">{errorMessage}</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 my-5">
        <label htmlFor="email" className="text-sm">
          Email
          <input
            onChange={handleChange}
            name="email"
            type="email"
            value={signUpInfo.email}
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
            value={signUpInfo.password}
            className="auth-input"
          />
        </label>
        <button type="submit" className="action-btn w-full my-3">
          Sign Up
        </button>
      </form>
    </main>
  );
}

export default Signup;
