import styles from './Header.module.css';
import { ProfileMenu } from '../../components/ProfileMenu/ProfileMenu';
import { SignButtons } from '../../components/SignButtons/SignButtons';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.js';
import { Link } from 'react-router-dom';

const Header = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <div>
          <Link to="/" className={styles.logo}>
            Diaspora
          </Link>
        </div>
        <div className={styles.header__profile}>
          {currentUser ? (
            <>
              <Link to={'/search'} className={styles.search_link} />
              <Link to={'/messenger'} className={styles.messenger_link} />
              <ProfileMenu
                id={currentUser['uid']}
                img={currentUser['photoURL']}
              />
            </>
          ) : (
            <SignButtons />
          )}
        </div>
      </div>
    </header>
  );
};

export { Header };
