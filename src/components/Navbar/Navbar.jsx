import styles from './Navbar.module.css';
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className={styles.user}>
      <img src={currentUser.photoURL} alt={currentUser.displayName} />
      <span>{currentUser.displayName}</span>
    </div>
  );
};

export { Navbar };
