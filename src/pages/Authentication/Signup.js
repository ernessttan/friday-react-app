/* eslint-disable max-len */
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import Input from '../../components/forms/Input';
import SubmitButton from '../../components/buttons/SubmitButton';

function Signup() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [signUpInfo, setSignUpInfo] = useState({
    firstName: '',
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setSignUpInfo({
      ...signUpInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('https://friday-productivity.herokuapp.com/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signUpInfo),
      }).then((res) => {
        if (res.status === 201) {
          res.json().then((userData) => {
            auth.login(userData.firstName, userData.userId, userData.token);
            navigate('/home');
          });
        }
      });
    } catch (error) {
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <main className="mt-20 flex justify-center">
      <div className="container max-w-xl border-grey-300 md:border-2 md:shadow-lg rounded-md p-12 bg-white">
        <h1 className="text-orange-500">
          <span className="text-black">Let&apos;s get</span>
          {' '}
          <br />
          Started.
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 py-3">
          <div className="error-msg">{errorMessage}</div>
          <label>
            Email
            <Input
              onChange={handleChange}
              name="email"
              type="email"
              value={signUpInfo.firstName}
              placeholder="Email"
              className="w-full p-2 py-3 rounded-md bg-grey-300"
              errorMessage="Please enter a your first name"
              required
            />
          </label>
          <label>
            Email
            <Input
              onChange={handleChange}
              name="email"
              type="email"
              value={signUpInfo.email}
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
              value={signUpInfo.password}
              placeholder="Password"
              className="w-full p-2 py-3 rounded-md bg-grey-300"
              errorMessage="Please enter a valid password"
              required
            />
          </label>
          <SubmitButton>Signup</SubmitButton>
        </form>
      </div>
    </main>
  );
}

export default Signup;
