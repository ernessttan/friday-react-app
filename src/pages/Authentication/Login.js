import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import Input from '../../components/forms/Input';
import SubmitButton from '../../components/buttons/SubmitButton';

function Login() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
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
      await fetch('https://friday-productivity.herokuapp.com/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInfo),
      }).then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            auth.login(data.firstName, data.userId, data.token);
            navigate('/home');
          });
        } else {
          setErrorMessage('Invalid email or password');
        }
      });
    } catch (error) {
      setErrorMessage('Something went wrong, please try again');
    }
  };

  return (
    <main className="mt-32 flex justify-center">
      <div className="container max-w-lg border border-gray-300 rounded-md p-12 bg-white">
        <h1 className="text-orange-500">
          <span className="text-black">Welcome Back</span>
          <br />
          Let&apos;s go!
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 py-3">
          <div className="error-msg">{errorMessage}</div>
          <label>
            Email
            <Input
              onChange={handleChange}
              name="email"
              type="email"
              value={loginInfo.email}
              placeholder="Email"
              className="w-full p-2 py-3 rounded-md bg-grey-300"
              errorMessage="Please enter a valid email"
              required
            />
          </label>
          <label>
            Password
            <Input
              onChange={handleChange}
              name="password"
              type="password"
              value={loginInfo.password}
              placeholder="Password"
              className="w-full p-2 py-3 rounded-md bg-grey-300"
              errorMessage="Please enter a valid password"
              required
            />
          </label>
          <SubmitButton>Login</SubmitButton>
        </form>
      </div>
    </main>
  );
}

export default Login;
