import { Link, useNavigate } from 'react-router-dom';
import styles from './SearchItem.module.css';
import { AuthContext } from '../../context/AuthContext';
import { useDispatch } from 'react-redux';
import { changeUser } from '../../redux/chat/actions';
import React, { useContext } from 'react';
import {
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from 'firebase/firestore';
import { db } from '../../firebase';

const SearchItem = (props) => {
  const { currentUser } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {
    const combinedId =
      currentUser.uid > props.id
        ? currentUser.uid + props.id
        : props.id + currentUser.uid;
    try {
      const res = await getDoc(doc(db, 'chats', combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, 'chats', combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [combinedId + '.info']: {
            uid: props.id,
            displayName: props.name,
            photoURL: props.photo,
          },
          [combinedId + '.date']: serverTimestamp(),
        });

        await updateDoc(doc(db, 'userChats', props.id), {
          [combinedId + '.info']: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });
      }
      const q = await getDoc(doc(db, 'userChats', currentUser.uid));
      const u = q.data();
      currentUser.uid &&
        dispatch(
          changeUser({
            data: u[combinedId].info,
            currentUserId: currentUser.uid,
          })
        );
      navigate('/messenger');
    } catch (err) {}
  };

  return (
    <li className={styles.item}>
      <Link className={styles.img_link} to={`/profile/${props.id}`}>
        <img src={props.photo} alt={props.name} className={styles.photo} />
      </Link>
      <div className={styles.info}>
        <span className={styles.name}>
          <Link to={`/profile/${props.id}`}>{props.name}</Link>
        </span>
        {props.country && <span>Live in {props.country}</span>}
        {props.homeland && <span>Born in {props.homeland}</span>}
        {props.nationality && <span>Nationality: {props.nationality}</span>}
        {props.age && (
          <span>
            Age: {new Date().getFullYear() - new Date(props.age).getFullYear()}{' '}
            y.o.
          </span>
        )}
        {props.languages && <span>Languages skills: {props.languages}</span>}
      </div>
      <div className={styles.links}>
        <Link to={`/profile/${props.id}`}>Go to profile</Link>
        <Link onClick={handleClick}>Go to message</Link>
      </div>
    </li>
  );
};

export { SearchItem };
