import styles from './Profile.module.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext.js';
import { ProfileInfo } from '../../components/ProfileInfo/ProfileInfo';
import { Posts } from '../../components/Posts/Posts';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { Loader } from '../../components/Loader/Loader';
import {
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { changeUser } from '../../redux/chat/actions';

const Profile = () => {
  const { id: profileId } = useParams();
  const [profileInfo, setProfileInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    if (currentUser.uid !== profileId) {
      const getData = async () => {
        const response = await getDoc(doc(db, 'users', profileId));
        setProfileInfo(response.data());
        setLoading(false);
      };
      getData();
    } else {
      setLoading(false);
    }
  }, [profileId, currentUser]);

  const handleClick = async () => {
    const combinedId =
      currentUser.uid > profileId
        ? currentUser.uid + profileId
        : profileId + currentUser.uid;
    try {
      const res = await getDoc(doc(db, 'chats', combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, 'chats', combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [combinedId + '.info']: {
            uid: profileId,
            displayName: profileInfo['displayName'],
            photoURL: profileInfo['photoURL'],
          },
          [combinedId + '.date']: serverTimestamp(),
        });

        await updateDoc(doc(db, 'userChats', profileId), {
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

  return !loading ? (
    profileId === currentUser.uid ? (
      <div className={styles.profile}>
        <section className={styles.profile__section}>
          <img
            src={currentUser['photoURL']}
            alt={currentUser['displayName'] + 'Photo'}
            className={styles.profile__photo}
          />
          <span className={styles.profile__name}>
            {currentUser['displayName']}
          </span>
          <Link className={styles.profile__btn} to={'/profile/edit'}>
            Edit
          </Link>
          <ProfileInfo info={currentUser} />
        </section>
        <Posts id={profileId} photo={currentUser['photoURL']} />
      </div>
    ) : profileInfo !== undefined ? (
      <div className={styles.profile}>
        <section className={styles.profile__section}>
          <img
            src={profileInfo['photoURL']}
            alt={profileInfo['displayName'] + 'Photo'}
            className={styles.profile__photo}
          />
          <span className={styles.profile__name}>
            {profileInfo['displayName']}
          </span>
          <div className={styles.links}>
            <Link onClick={handleClick}>Go to Message</Link>
          </div>
          <ProfileInfo info={profileInfo} />
        </section>
        <Posts id={profileId} photo={profileInfo['photoURL']} />
      </div>
    ) : (
      <h2>User does not exist</h2>
    )
  ) : (
    <Loader />
  );
};

export { Profile };
