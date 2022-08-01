/* eslint-disable react/no-unescaped-entities */
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Input from "../../components/Forms/Input";
import SubmitButton from "../../components/Buttons/SubmitButton";

function Login() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
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
      await fetch("https://friday-productivity.herokuapp.com/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      }).then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            auth.login(data.firstName, data.userId, data.token);
            navigate("/home");
          });
        } else {
          setErrorMessage("Invalid email or password");
        }
      });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <main className="container mx-auto max-w-lg">
      <h1 className="text-orange-500 mt-[15vh]">
        <span className="text-black">Welcome Back</span>
        <br />
        Let's go!
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 my-5">
        <div className="error-msg">{errorMessage}</div>
        <Input
          handleChange={handleChange}
          name="email"
          type="email"
          label="Email"
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
          label="Password"
          value={loginInfo.password}
          placeholder="Password"
          className="auth-input"
          errorMessage="Please enter a valid password"
          required
        />
        <SubmitButton name="Login" />
      </form>
    </main>
  );
}

export default Login;
