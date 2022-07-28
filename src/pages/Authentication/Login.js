/* eslint-disable react/no-unescaped-entities */
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Input from "../../components/Forms/Input";

function Login() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:4000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      }).then((res) => res.json())
        .then((userData) => {
          auth.login(userData.userId, userData.token);
          navigate("/home");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <h1 className="text-orange-500 mt-[15vh]">
        <span className="text-black">Welcome Back</span>
        <br />
        Let's go!
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 my-5">
        <Input
          handleChange={handleChange}
          name="email"
          type="email"
          value={loginInfo.email}
          placeholder="Email"
          className="auth-input"
          errorMessage="Please enter a valid email"
          required
        />
        <Input
          handleChange={handleChange}
          name="password"
          type="password"
          value={loginInfo.password}
          placeholder="Password"
          className="auth-input"
          errorMessage="Please enter a valid password"
          required
        />
        <button type="submit" className="action-btn w-full my-3">
          Login
        </button>
      </form>
    </main>
  );
}

export default Login;