import styles from './MessengerList.module.css';
import { MessengerSearch } from '../MessengerSearch/MessengerSearch';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useDispatch } from 'react-redux';
import { changeUser } from '../../redux/chat/actions';

const MessengerList = () => {
  const [chats, setChats] = useState([]);
  const [filteredChats, setFilteredChats] = useState([]);
  const [search, setSearch] = useState('');

  const { currentUser } = useContext(AuthContext);
  const dispatch = useDispatch();

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
        setChats(Object.entries(doc.data()));
        setFilteredChats(Object.entries(doc.data()));
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  useEffect(() => {
    if (search.trim() !== '') {
      setFilteredChats(
        chats.filter(
          (el) => el[1]['info']['displayName'].indexOf(search) !== -1
        )
      );
    } else {
      setFilteredChats([...chats]);
    }
  }, [search, chats]);

  const handleSelect = (u) => {
    currentUser.uid &&
      dispatch(changeUser({ data: u, currentUserId: currentUser.uid }));
  };

  return (
    <>
      <MessengerSearch search={search} setSearch={setSearch} />
      <div className={styles.users}>
        <ul className={styles.usersList}>
          {filteredChats
            ?.sort((a, b) => b[1].date - a[1].date)
            .map((chat) => (
              <li
                className={styles.usersItem}
                key={chat[0]}
                onClick={() => handleSelect(chat[1].info)}
              >
                <img src={chat[1].info.photoURL} alt="" />
                <div>
                  <span className={styles.userListName}>
                    {chat[1].info.displayName}
                  </span>
                  <span>{chat[1].lastMessage?.text}</span>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export { MessengerList };
