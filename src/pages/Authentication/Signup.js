/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Forms/Input";
import SubmitButton from "../../components/Buttons/SubmitButton";

function Signup() {
  const navigate = useNavigate();
  const [signUpInfo, setSignUpInfo] = useState({
    email: "",
    password: "",
  });

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
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 my-5">
        <Input
          handleChange={handleChange}
          name="email"
          type="email"
          value={signUpInfo.email}
          placeholder="Email"
          className="auth-input"
          label="Email"
          errorMessage="Please enter a valid email"
          required
        />
        <Input
          handleChange={handleChange}
          name="password"
          type="password"
          value={signUpInfo.password}
          placeholder="Password"
          className="auth-input"
          label="Password"
          pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$"
          errorMessage="Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!"
          required
        />
        <SubmitButton
          name="Sign Up"
        />
      </form>
    </main>
  );
}

export default Signup;
