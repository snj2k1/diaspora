import styles from './AddPost.module.css';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';

const AddPost = (props) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const input = e.target.querySelector('#posts_form_text').value;
    if (input) {
      await addDoc(collection(db, 'posts'), {
        uid: props.uid,
        displayName: props.displayName,
        timestamp: serverTimestamp(),
        input,
      });

      e.target.querySelector('#posts_form_text').value = '';
    }
  };

  return (
    <>
      <h2>Add new post</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <textarea id="posts_form_text" placeholder="Anything new?"></textarea>
        <input type="submit" value="Publish" />
      </form>
    </>
  );
};

export { AddPost };
