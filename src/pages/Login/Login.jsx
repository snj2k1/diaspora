import styles from './Login.module.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase.js';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.querySelector('#auth_email').value.toLowerCase();
    const password = e.target.querySelector('#auth_password').value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <section>
      <h1 className={styles.auth_title}>Sign In</h1>
      <form className={styles.auth} onSubmit={handleSubmit}>
        {err && <span style={{ color: 'red' }}>Wrong E-Mail or password!</span>}
        <label htmlFor="auth_email">E-Mail:</label>
        <input type="email" id="auth_email" />
        <label htmlFor="auth_password">Password:</label>
        <input type="password" id="auth_password" />
        <input type="submit" value="LOGIN" />
      </form>
      <div className={styles.auth_question}>
        Not registered yet? <Link to="/register">Sign Up</Link>
      </div>
    </section>
  );
};

export { Login };
