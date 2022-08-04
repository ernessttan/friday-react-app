import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import Button from '../../components/buttons/Button';

function Welcome() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');

  const handleGuestLogin = async (e) => {
    e.preventDefault();
    try {
      await fetch('https://friday-productivity.herokuapp.com/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'guest@gmail.com',
          password: 'guest123!',
        }),
      }).then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            auth.login(data.firstName, data.userId, data.token);
            navigate('/home');
          });
        }
      });
    } catch (error) {
      setErrorMessage('Invalid email or password, please try again');
    }
  };

  return (
    <main className="mt-32 rounded-md border-grey-300 md:border md:p-8 md:py-20 md:shadow-lg">
      <h1 className="text-orange-500">
        <span className="text-black">Introducing</span>
        <br />
        Friday.
      </h1>
      <div className="error-msg">{errorMessage}</div>
      <p className="py-3 text-xl font-normal">
        A task management app to help you get to Friday faster.
      </p>
      <div className="flex flex-col gap-3 py-5">
        <Button onClick={() => navigate('/signup')}>Sign Up</Button>
        <Button onClick={() => navigate('/login')}>Login</Button>
        <Button onClick={handleGuestLogin}>Take a Look Inside</Button>
      </div>
    </main>
  );
}

export default Welcome;
