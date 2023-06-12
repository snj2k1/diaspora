import { onSnapshot, collection, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import styles from './Search.module.css';
import { useEffect, useState, useContext } from 'react';
import { SearchItem } from '../../components/SearchItem/SearchItem';
import { Loader } from '../../components/Loader/Loader';
import { Filter } from '../../components/Filter/Filter';
import { AuthContext } from '../../context/AuthContext';
import { useSelector } from 'react-redux';
import { getSearchParams } from '../../redux/search/selectors.ts';

const Search = () => {
  const { currentUser } = useContext(AuthContext);
  const data = useSelector(getSearchParams);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const unsub = async () => {
      await onSnapshot(
        query(collection(db, 'users'), where('role', '==', 'GIVE')),
        (snapshot) => {
          const usersList = snapshot.docs
            .map((el) => el.data())
            .filter((user) => user.uid !== currentUser.uid);
          let filteredUsers = [];
          if (data.gender && data.minAge && data.maxAge) {
            filteredUsers = usersList.filter(
              (user) =>
                (data.country === 'all' || user.country === data.country) &&
                (data.nationality === 'all' ||
                  user.nationality === data.nationality) &&
                user.gender === data.gender &&
                new Date().getFullYear() - new Date(user.age).getFullYear() >=
                  data.minAge &&
                new Date().getFullYear() - new Date(user.age).getFullYear() <=
                  data.maxAge
            );
          } else if (data.gender && data.minAge && !data.maxAge) {
            filteredUsers = usersList.filter(
              (user) =>
                (data.country === 'all' || user.country === data.country) &&
                (data.nationality === 'all' ||
                  user.nationality === data.nationality) &&
                user.gender === data.gender &&
                new Date().getFullYear() - new Date(user.age).getFullYear() >=
                  data.minAge
            );
          } else if (data.gender && !data.minAge && data.maxAge) {
            filteredUsers = usersList.filter(
              (user) =>
                (data.country === 'all' || user.country === data.country) &&
                (data.nationality === 'all' ||
                  user.nationality === data.nationality) &&
                user.gender === data.gender &&
                new Date().getFullYear() - new Date(user.age).getFullYear() <=
                  data.maxAge
            );
          } else if (data.gender && !data.minAge && !data.maxAge) {
            filteredUsers = usersList.filter(
              (user) =>
                (data.country === 'all' || user.country === data.country) &&
                (data.nationality === 'all' ||
                  user.nationality === data.nationality) &&
                user.gender === data.gender
            );
          } else if (!data.gender && data.minAge && data.maxAge) {
            filteredUsers = usersList.filter(
              (user) =>
                (data.country === 'all' || user.country === data.country) &&
                (data.nationality === 'all' ||
                  user.nationality === data.nationality) &&
                new Date().getFullYear() - new Date(user.age).getFullYear() >=
                  data.minAge &&
                new Date().getFullYear() - new Date(user.age).getFullYear() <=
                  data.maxAge
            );
          } else if (!data.gender && !data.minAge && data.maxAge) {
            filteredUsers = usersList.filter(
              (user) =>
                (data.country === 'all' || user.country === data.country) &&
                (data.nationality === 'all' ||
                  user.nationality === data.nationality) &&
                new Date().getFullYear() - new Date(user.age).getFullYear() <=
                  data.maxAge
            );
          } else if (!data.gender && data.minAge && !data.maxAge) {
            filteredUsers = usersList.filter(
              (user) =>
                (data.country === 'all' || user.country === data.country) &&
                (data.nationality === 'all' ||
                  user.nationality === data.nationality) &&
                new Date().getFullYear() - new Date(user.age).getFullYear() >=
                  data.minAge
            );
          } else {
            filteredUsers = usersList.filter(
              (user) =>
                (data.country === 'all' || user.country === data.country) &&
                (data.nationality === 'all' ||
                  user.nationality === data.nationality)
            );
          }
          setUsers(filteredUsers);
          setIsLoading(false);
        }
      );
    };

    currentUser.uid && unsub();
  }, [data, currentUser.uid]);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <section className={styles.filter}>
        <h2>Filter</h2>
        <Filter data={data} />
      </section>
      <section className={styles.find}>
        {users.length ? (
          <ul className={styles.list}>
            {users.map((user, index) => (
              <SearchItem
                key={index}
                id={user.uid}
                name={user.displayName}
                photo={user.photoURL}
                homeland={user.homeland}
                nationality={user.nationality}
                country={user.country}
                age={user.age}
                languages={user.languages}
              />
            ))}
          </ul>
        ) : (
          <h2>Nothing found for this query...</h2>
        )}
      </section>
    </>
  );
};

export { Search };
