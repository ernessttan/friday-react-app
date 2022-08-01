/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Forms/Input";
import SubmitButton from "../../components/Buttons/SubmitButton";
import AuthContext from "../../context/AuthContext";

function Signup() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [signUpInfo, setSignUpInfo] = useState({
    firstName: "",
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
      await fetch("https://friday-productivity.herokuapp.com/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpInfo),
      })
        .then((res) => {
          if (res.status === 201) {
            res.json().then((userData) => {
              auth.login(userData.firstName, userData.userId, userData.token);
              navigate("/home");
            });
          } else {
            setErrorMessage("Invalid email or password");
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <main className="container mx-auto max-w-lg">
      <h1 className="text-orange-500 mt-[15vh]">
        <span className="text-black">Let's get</span>
        <br />
        Started.
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 my-5">
        <div className="error-msg">{errorMessage}</div>
        <Input
          handleChange={handleChange}
          name="firstName"
          type="text"
          value={signUpInfo.firstName}
          placeholder="John"
          className="auth-input"
          label="First Name"
          errorMessage="Please enter a your first name"
          required
        />
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
