import styles from './Message.module.css';
import { AuthContext } from '../../context/AuthContext';
import { useContext, useEffect, useRef, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const Message = ({ message }) => {
  const [user, setUser] = useState({});
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getData = async () => {
      const response = await getDoc(doc(db, 'users', message.senderId));
      response.exists() && setUser(response.data());
    };

    if (message.senderId !== currentUser.uid) {
      getData();
    }
  }, [message]);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  return (
    <li className={styles.messagesItem} ref={ref}>
      <img
        src={
          message.senderId === currentUser.uid
            ? currentUser.photoURL
            : user.photoURL
        }
        alt=""
      />
      <div>
        <span className={styles.messageName}>
          {message.senderId === currentUser.uid
            ? currentUser.displayName
            : user.displayName}
          <span className={styles.date}>
            {message.date && message.date.toDate().toLocaleString()}
          </span>
        </span>
        <span>{message.text}</span>
        {message.img && (
          <img className={styles.message_img} src={message.img} alt="" />
        )}
      </div>
    </li>
  );
};

export { Message };
