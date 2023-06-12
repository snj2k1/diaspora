import { Chat } from '../../components/Chat/Chat';
import styles from './Messenger.module.css';
import { Sidebar } from '../../components/Sidebar/Sidebar';

const Messenger = () => {
  return (
    <div className={styles.messenger}>
      <Sidebar />
      <Chat />
    </div>
  );
};

export { Messenger };
