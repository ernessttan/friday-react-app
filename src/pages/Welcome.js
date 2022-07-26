import { Link } from "react-router-dom";

function Welcome() {
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
      <Link to="/signup" type="button" className="action-btn w-full my-3">
        Sign Up
      </Link>
      <Link to="/login" type="button" className="action-btn w-full my-3">
        Login
      </Link>
    </main>
  );
}

export default Welcome;
