import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import Button from "../../components/Buttons/Button";

function Welcome() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");

  const handleGuestLogin = async (e) => {
    e.preventDefault();
    try {
      await fetch("https://friday-productivity.herokuapp.com/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "guest@gmail.com",
          password: "guest123!",
        }),
      }).then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            auth.login(data.firstName, data.userId, data.token);
            navigate("/home");
          });
        } else {
          setErrorMessage("Oops Something Went Wrong! Please try again or try signing up");
        }
      });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <main className="container mx-auto max-w-lg">
      <h1 className="text-orange-500 mt-[20vh]">
        <span className="text-black">Introducing</span>
        <br />
        Friday.
      </h1>
      <div className="error-msg">{errorMessage}</div>
      <p className="text-xl my-3 mb-6">
        A task management app to help you get stuff done faster
      </p>
      <div className="flex flex-col gap-3">
        <Button
          handleClick={() => navigate("/signup")}
          type="button"
          name="Sign Up"
          fullWidth
        />
        <Button
          handleClick={() => navigate("/login")}
          type="button"
          name="Log In"
          fullWidth
        />
        <Button
          handleClick={handleGuestLogin}
          type="button"
          name="Take a Look Inside"
          fullWidth
        />
      </div>
    </main>
  );
}

export default Welcome;
