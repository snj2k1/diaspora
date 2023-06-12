import styles from './Chat.module.css';
import { Messages } from '../Messages/Messages';
import { NewMessage } from '../NewMessage/NewMessage';
import { Link } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';
import { getChat } from '../../redux/chat/selectors.ts';
import { useDispatch } from 'react-redux';
import { resetUser } from '../../redux/chat/actions';

const Chat = () => {
  const data = useSelector(getChat);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(resetUser());
  };

  return data.chatId !== 'null' ? (
    <section className={styles.chat}>
      <button className={styles.delete} onClick={handleClick}>
        ←
      </button>
      <div className={styles.user}>
        <Link to={`/profile/${data.user?.uid}`}>
          <img src={data.user?.photoURL} alt={data.user?.displayName} />
          <span>{data.user?.displayName}</span>
        </Link>
      </div>
      <Messages />
      <NewMessage />
    </section>
  ) : (
    <span className={styles.chooseText}>Choose a chat...</span>
  );
};

export { Chat };
