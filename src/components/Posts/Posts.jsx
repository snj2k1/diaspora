import { useContext, useEffect, useState } from 'react';
import { onSnapshot, collection, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { AuthContext } from '../../context/AuthContext.js';
import styles from './Posts.module.css';
import { Post } from '../Post/Post';
import { AddPost } from '../AddPost/AddPost.jsx';

const Posts = (props) => {
  const { currentUser } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, 'posts'), where('uid', '==', props.id)),
      (snapshot) => {
        setPosts(snapshot.docs.map((el) => el.data()));
      }
    );
    return () => unsub();
  }, [props.id]);

  return (
    <section className={styles.posts}>
      {props.id === currentUser.uid && (
        <AddPost uid={currentUser.uid} displayName={currentUser.displayName} />
      )}
      <h2>Posts:</h2>
      {!posts.length ? (
        <div className={styles.no_posts}>No posts yet</div>
      ) : (
        <ul className={styles.posts__list}>
          {posts
            .sort((a, b) => b.timestamp - a.timestamp)
            .map((data, index) => (
              <Post data={data} key={index} photo={props.photo} />
            ))}
        </ul>
      )}
    </section>
  );
};

export { Posts };
