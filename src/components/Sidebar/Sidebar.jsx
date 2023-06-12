import { MessengerList } from '../../components/MessengerList/MessengerList';
import styles from './Sidebar.module.css';
import { Navbar } from '../Navbar/Navbar';
import { useSelector } from 'react-redux';
import { getChat } from '../../redux/chat/selectors.ts';

const Sidebar = () => {
  const data = useSelector(getChat);

  return data.chatId === 'null' ? (
    <section className={styles.sidebar}>
      <Navbar />
      <MessengerList />
    </section>
  ) : (
    <section className={`${styles.sidebar} ${styles.sidebar_hidden}`}>
      <Navbar />
      <MessengerList />
    </section>
  );
};
export { Sidebar };
