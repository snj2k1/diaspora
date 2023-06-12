import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import { Modal } from '../../components/Modal/Modal';
import { useState } from 'react';

const Home = (props) => {
  const [modalActive, setModalActive] = useState(false);

  return (
    <section>
      <ul className={styles.home_grid}>
        <li className={styles.home__card}>
          <span className={styles.home__card_title}>WHAT IS DIASPORA?</span>
          <p className={styles.home__card_desc}>
            Social network that helps you get comfortable in a new country
          </p>
        </li>
        <li className={styles.home__card}>
          <span className={styles.home__card_title}>WHAT WE DO?</span>
          <p className={styles.home__card_desc}>
            Here you can get help from local people, find your compatriots or
            just find a friend
          </p>
        </li>
        <li className={styles.home__card}>
          <span className={styles.home__card_title}>WHAT ARE WE GIVING?</span>
          <p className={styles.home__card_desc}>
            We provide a convenient system for searching people by country and
            nationality. You can find the right person for you and chat with
            him.
          </p>
        </li>
        <li className={styles.home__card}>
          <span className={styles.home__card_title}>WHY US?</span>
          <p className={styles.home__card_desc}>
            Because we are a unique service that is focused only on helping
            people who have changed their country of residence
          </p>
        </li>
      </ul>
      <div className={styles.home__button}>
        {props.status ? (
          <button
            className={styles.home__btn}
            onClick={() => setModalActive(true)}
          >
            GET STARTED
          </button>
        ) : (
          <Link className={styles.home__btn} to="/login">
            GET STARTED
          </Link>
        )}
      </div>
      <Modal active={modalActive} setActive={setModalActive} />
    </section>
  );
};

export { Home };
