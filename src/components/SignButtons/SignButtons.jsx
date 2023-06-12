import { Link } from 'react-router-dom';
import styles from './SignButtons.module.css';

const SignButtons = () => {
  return (
    <div>
      <Link to="/login" className={styles.signin}>
        Sign In
      </Link>
      <Link to="/register" className={styles.signup}>
        Sign Up
      </Link>
    </div>
  );
};

export { SignButtons };
