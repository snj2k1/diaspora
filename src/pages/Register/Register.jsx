import styles from './Register.module.css';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../../firebase.js';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { DrawCountries } from '../../components/DrawCountries/DrawCountries';
import countriesJsonFile from '../../countries.json';

const Register = () => {
  const [err, setErr] = useState(false);
  const [country, setCountry] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCountry(countriesJsonFile);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.querySelector('#register_email').value.toLowerCase();
    const password = e.target.querySelector('#register_password').value;
    const displayName = e.target.querySelector('#register_display_name').value;
    const country = e.target.querySelector('#register_country').value;
    const nationality = e.target.querySelector('#register_nationality').value;
    const role = e.target.querySelector('#register_role').value;
    const file = e.target.querySelector('#register_photo').files[0];

    if (file) {
      try {
        if (!displayName) {
          throw new Error();
        }

        const res = await createUserWithEmailAndPassword(auth, email, password);

        const storageRef = ref(storage, file.name);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          (error) => {
            setErr(true);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                await updateProfile(res.user, {
                  displayName,
                  photoURL: downloadURL,
                });
                await setDoc(doc(db, 'users', res.user.uid), {
                  uid: res.user.uid,
                  displayName,
                  country,
                  nationality,
                  role,
                  photoURL: downloadURL,
                });
                await setDoc(doc(db, 'userChats', res.user.uid), {});
                navigate('/');
              }
            );
          }
        );
      } catch (err) {
        setErr(true);
      }
    } else {
      try {
        if (!displayName) {
          throw new Error();
        }
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(res.user, {
          displayName,
          photoURL:
            'https://firebasestorage.googleapis.com/v0/b/diaspora-a4737.appspot.com/o/user.jpg?alt=media&token=17524e7e-e606-4cea-8a7e-6860b107738c',
        });
        await setDoc(doc(db, 'users', res.user.uid), {
          uid: res.user.uid,
          displayName,
          country,
          nationality,
          role,
          photoURL:
            'https://firebasestorage.googleapis.com/v0/b/diaspora-a4737.appspot.com/o/user.jpg?alt=media&token=17524e7e-e606-4cea-8a7e-6860b107738c',
        });
        await setDoc(doc(db, 'userChats', res.user.uid), {});
        navigate('/');
      } catch (err) {
        setErr(true);
      }
    }
  };

  return (
    <section>
      <h1 className={styles.auth_title}>Sign Up</h1>
      <form className={styles.auth} onSubmit={handleSubmit}>
        {err && (
          <span style={{ color: 'red' }}>Oops, something went wrong!</span>
        )}
        <label htmlFor="auth_display_name">
          Display name <span style={{ color: 'red' }}>*</span>:
        </label>
        <input type="text" id="register_display_name" />
        <label htmlFor="register_email">
          E-Mail <span style={{ color: 'red' }}>*</span>:
        </label>
        <input type="email" id="register_email" />
        <label htmlFor="register_password">
          Password <span style={{ color: 'red' }}>*</span>:
        </label>
        <input type="password" id="register_password" />
        <label htmlFor="register_country">Country of Residence:</label>
        <select id="register_country">
          <option disabled="disabled">Select a country...</option>
          {country.map((element, index) => {
            return (
              <DrawCountries key={index} name={element['en_short_name']} />
            );
          })}
        </select>
        <label htmlFor="register_nationality">Nationality:</label>
        <select id="register_nationality">
          <option disabled="disabled">Select a nationality...</option>
          {country.map((element, index) => {
            return <DrawCountries key={index} name={element['nationality']} />;
          })}
        </select>
        <label htmlFor="register_role">Role:</label>
        <select id="register_role">
          <option value="GET">In search</option>
          <option value="GIVE">Assistant</option>
        </select>
        <label htmlFor="register_photo">Upload a photo:</label>
        <input type="file" id="register_photo" accept="image/*" />
        <input type="submit" value="REGISTER" />
      </form>
      <div className={styles.auth_question}>
        Are you already registered? <Link to="/login">Sign In</Link>
      </div>
    </section>
  );
};

export { Register };
