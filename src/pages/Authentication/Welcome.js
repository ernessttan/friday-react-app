import { useNavigate } from "react-router-dom";
import Button from "../../components/Buttons/Button";

function Welcome() {
  const navigate = useNavigate();

  return (
    <main className="container mx-auto max-w-lg">
      <h1 className="text-orange-500 mt-[20vh]">
        <span className="text-black">Introducing</span>
        <br />
        Friday.
      </h1>
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
      </div>

    </main>
  );
}

export default Welcome;
