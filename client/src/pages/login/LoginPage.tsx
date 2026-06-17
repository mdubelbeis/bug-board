import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [errors, setErrors] = useState<{ title: string; message: string } | null>(null);
  const navigate = useNavigate();

  async function handleLogin(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors(null);
    const form = new FormData(e.currentTarget);

    const email = form.get('email');
    const password = form.get('password');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      if (data) {
        localStorage.setItem('token', data.token);

        navigate('/dashboard', {});
      }
    } catch (err) {
      if (err instanceof Error) {
        setErrors({ title: 'Failure to login. ', message: err.message });
      }
    }
  }
  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' id='email' />
        </div>
        <div>
          <label htmlFor='password'>Password: </label>
          <input type='password' name='password' id='password' />
        </div>
        <button>Login</button>
      </form>
      {errors && (
        <div>
          <span>{errors.title}</span>
          <span>{errors.message}</span>
        </div>
      )}
    </>
  );
};

export default LoginPage;
