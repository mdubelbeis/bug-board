import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignupPage.module.css';

const SignupPage = () => {
  const [fieldErrors, setFieldErrors] = useState<
    {
      field: string;
      value: string;
      message: string;
    }[]
  >([]);
  const [errors, setErrors] = useState<{ title: string; message: string } | null>(null);
  const navigate = useNavigate();

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setFieldErrors([]);
    setErrors(null);

    const form = new FormData(e.currentTarget);

    const name = form.get('name');
    const email = form.get('email');
    const password = form.get('password');
    const passwordConfirm = form.get('password-confirm');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          passwordConfirm,
        }),
      });

      const data = await response.json();

      if (data.errors) {
        setFieldErrors(data.errors);
      }

      if (!response.ok) {
        throw new Error(data.message);
      }

      if (data) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      }
    } catch (err) {
      if (err instanceof Error) {
        setErrors({ title: 'Failure to Signup. ', message: err.message });
      }
    }
  }

  return (
    <main className={styles.authPage}>
      <section className={styles.authCard}>
        <div className={styles.authHeader}>
          <p className={styles.eyebrow}>Bug-Board</p>
          <h1>Create your account</h1>
          <p>Start tracking projects, bugs, priorities, and updates.</p>
        </div>

        <form className={styles.authForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor='name'>Name</label>
            <input type='text' name='name' id='name' required placeholder='Enter your name' />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' id='email' required placeholder='Enter your email' />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              id='password'
              required
              placeholder='Enter a password'
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor='password-confirm'>Confirm Password</label>
            <input
              type='password'
              name='password-confirm'
              id='password-confirm'
              required
              placeholder='Enter your password again'
            />
          </div>

          {errors && fieldErrors.length === 0 && (
            <p className={styles.errorMessage}>{`${errors.title}${errors.message}`}</p>
          )}

          {fieldErrors.length > 0 && (
            <div className={styles.errorList}>
              {fieldErrors.map((error) => (
                <p key={`${error.field}-${error.message}`}>
                  {`${error.message.slice(0, 1).toUpperCase()}${error.message.slice(1)}`}
                </p>
              ))}
            </div>
          )}

          <div className={styles.buttonGroup}>
            <button className={styles.secondaryButton} type='reset'>
              Reset
            </button>
            <button className={styles.primaryButton} type='submit'>
              Sign up
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default SignupPage;
