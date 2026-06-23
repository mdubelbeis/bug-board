import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const [errors, setErrors] = useState<{ title: string; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
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

      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      if (err instanceof Error) {
        setErrors({ title: 'Failure to login. ', message: err.message });
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className={styles.authPage}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <p className={styles.eyebrow}>Bug-Board</p>
          <h1>Welcome back</h1>
          <p>Log in to view your dashboard, projects, bugs, and account.</p>
        </div>

        <form className={styles.authForm} onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='demo@bugboard.dev'
              defaultValue='demo@bugboard.dev'
              required
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='password123'
              defaultValue='password123'
              required
              disabled={isSubmitting}
            />
          </div>

          {errors && (
            <div className={styles.errorMessage}>
              <span>{errors.title}</span>
              <span>{errors.message}</span>
            </div>
          )}

          <button
            className={styles.primaryButton}
            type='submit'
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className={styles.spinner} aria-hidden='true' />
                Logging in...
              </>
            ) : (
              'Log in'
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
