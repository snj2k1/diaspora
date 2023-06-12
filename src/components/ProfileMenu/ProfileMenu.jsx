import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import styles from './ProfileMenu.module.css';
import { useState } from 'react';

const ProfileMenu = (props) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenu = (e) => {
    const hiddenMenu = e.currentTarget.querySelector('#profile_hidden_menu');
    const menu = e.currentTarget;

    if (!menuOpen) {
      hiddenMenu.style.transform = 'scaleY(1)';
      hiddenMenu.style.top = '101%';
      hiddenMenu.style.opacity = '1';
      menu.style.backgroundColor = 'rgba(255,255,255,0.3)';
      setMenuOpen(true);
    } else {
      hiddenMenu.style.transform = 'scaleY(0)';
      hiddenMenu.style.top = '0';
      hiddenMenu.style.opacity = '0';
      menu.style.backgroundColor = '';
      setMenuOpen(false);
    }
  };

  const logout = () => {
    signOut(auth);
    navigate('/');
  };

  return (
    <div className={styles.profile_menu} onClick={handleMenu}>
      <img
        src={
          props.img ||
          'https://firebasestorage.googleapis.com/v0/b/diaspora-a4737.appspot.com/o/user.jpg?alt=media&token=17524e7e-e606-4cea-8a7e-6860b107738c'
        }
        alt="Profile"
        className={styles.profile_menu__user_photo}
      />
      <span className={styles.profile_menu__user_arrow}>
        <svg
          fill="none"
          height="8"
          viewBox="0 0 12 8"
          width="12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.16 2.3a.75.75 0 0 1 1.05-.14L6 4.3l2.8-2.15a.75.75 0 1 1 .9 1.19l-3.24 2.5c-.27.2-.65.2-.92 0L2.3 3.35a.75.75 0 0 1-.13-1.05z"
            fill="currentColor"
          ></path>
        </svg>
      </span>
      <div className={styles.profile_menu__hidden} id="profile_hidden_menu">
        <Link to={'/profile/' + props.id}>Profile</Link>
        <Link to={'/messenger'}>Messages</Link>
        <button onClick={logout}>Log Out</button>
      </div>
    </div>
  );
};

export { ProfileMenu };
