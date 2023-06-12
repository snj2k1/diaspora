import styles from './Messages.module.css';
import React, { useEffect, useState } from 'react';

import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { Message } from '../Message/Message';
import { useSelector } from 'react-redux';
import { getChat } from '../../redux/chat/selectors.ts';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const data = useSelector(getChat);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <div className={styles.messages}>
      <ul className={styles.messagesList}>
        {messages.map((m) => (
          <Message message={m} key={m.id} />
        ))}
      </ul>
    </div>
  );
};

export { Messages };
