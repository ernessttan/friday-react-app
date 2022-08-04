import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Input from '../components/forms/Input';
import SubmitButton from '../components/buttons/SubmitButton';

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
    <main className="p-5 mt-32 rounded-md border-grey-300 md:border md:p-8 md:shadow-lg">
      <h1 className="text-orange-500">
        <span className="text-black">Let&apos;s get</span>
        <br />
        Started.
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 py-5">
        <label>
          First Name
          <Input
            name="firstName"
            type="text"
            value={signUpInfo.firstName}
            placeholder="First Name"
            className="w-full p-2 py-3 rounded-md bg-grey-300"
            errorMessage="Please enter your first name"
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email
          <Input
            name="email"
            type="email"
            value={signUpInfo.email}
            placeholder="Email"
            className="w-full p-2 py-3 rounded-md bg-grey-300"
            errorMessage="Please enter a valid email"
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password
          <Input
            name="password"
            type="password"
            value={signUpInfo.password}
            placeholder="Password"
            className="w-full p-2 py-3 rounded-md bg-grey-300"
            pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$"
            errorMessage="Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!"
            onChange={handleChange}
            required
          />
        </label>
        <SubmitButton className="py-3">Sign Up</SubmitButton>
      </form>
    </main>
  );
}

export default Signup;
