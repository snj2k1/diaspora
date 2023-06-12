import styles from './EditProfile.module.css';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext.js';
import countriesJsonFile from '../../countries.json';
import { DrawCountries } from '../../components/DrawCountries/DrawCountries';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, storage } from '../../firebase.js';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const EditProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const [err, setErr] = useState(false);
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();

  const [about, setAbout] = useState();
  const [age, setAge] = useState();
  const [address, setAddress] = useState();
  const [displayName, setDisplayName] = useState();
  const [languages, setLanguages] = useState();
  const [gender, setGender] = useState();
  const [role, setRole] = useState();
  const [country, setCountry] = useState();
  const [nationality, setNationality] = useState();
  const [homeland, setHomeland] = useState();

  useEffect(() => {
    setAbout(currentUser['about']);
    setAge(currentUser['age']);
    setAddress(currentUser['address']);
    setDisplayName(currentUser['displayName']);
    setLanguages(currentUser['languages']);
    setGender(currentUser['gender']);
    setRole(currentUser['role']);
    setCountry(currentUser['country']);
    setNationality(currentUser['nationality']);
    setHomeland(currentUser['homeland']);
  }, [currentUser]);

  useEffect(() => {
    setCountries(countriesJsonFile);
  }, []);

  const handlePhoto = (e) => {
    const files = e.target.files;

    if (FileReader && files && files.length) {
      const fr = new FileReader();
      fr.onload = function () {
        document.getElementById('edit_photo_preview').src = fr.result;
      };
      fr.readAsDataURL(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = e.target.querySelector('#edit_photo').files[0];

    try {
      if (file) {
        const storageRef = ref(storage, file.name);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask
          .then(() => {
            getDownloadURL(storageRef).then((downloadURL) => {
              updateProfile(auth.currentUser, {
                displayName,
                photoURL: downloadURL,
              });
              setDoc(doc(db, 'users', auth.currentUser.uid), {
                uid: auth.currentUser.uid,
                displayName,
                country,
                nationality,
                role,
                languages: languages ? languages : null,
                age: age ? age : null,
                address: address ? address : null,
                gender: gender ? gender : null,
                about: about ? about : null,
                homeland: homeland ? homeland : null,
                photoURL: downloadURL,
              });
            });
          })
          .catch(setErr(true));
      } else {
        updateProfile(auth.currentUser, {
          displayName,
          photoURL: currentUser['photoURL'],
        }).catch(() => {
          setErr(true);
        });
        setDoc(doc(db, 'users', auth.currentUser.uid), {
          uid: auth.currentUser.uid,
          displayName,
          country,
          nationality,
          role,
          languages: languages ? languages : null,
          age: age ? age : null,
          address: address ? address : null,
          gender: gender ? gender : null,
          about: about ? about : null,
          homeland: homeland ? homeland : null,
          photoURL: currentUser['photoURL'],
        }).catch(() => {
          setErr(true);
        });
      }
      navigate(-1);
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <section className={styles.edit}>
      <button className={styles.back} onClick={() => navigate(-1)}>
        &#8592;
      </button>
      <h2>EDIT PROFILE</h2>
      <img
        src={currentUser['photoURL']}
        alt={currentUser['displayName'] + 'Photo'}
        className={styles.edit_show_photo}
        id="edit_photo_preview"
      />
      <form className={styles.edit_form} onSubmit={handleSubmit}>
        {err && (
          <span style={{ color: 'red' }}>Oops, something went wrong!</span>
        )}
        <label htmlFor="edit_about">About me:</label>
        <textarea
          placeholder="Tell us about yourself..."
          id="edit_about"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        ></textarea>
        <label htmlFor="edit_photo">Upload a photo:</label>
        <input
          type="file"
          id="edit_photo"
          accept="image/*"
          onChange={handlePhoto}
        />
        <label htmlFor="edit_display_name">Display name:</label>
        <input
          type="text"
          id="edit_display_name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <label htmlFor="edit_gender">Gender:</label>
        <select
          id="edit_gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option disabled="disabled" selected>
            Select a gender...
          </option>
          {gender === 'Male' ? (
            <option value="Male" selected>
              Male
            </option>
          ) : (
            <option value="Male">Male</option>
          )}
          {gender === 'Female' ? (
            <option value="Female" selected>
              Female
            </option>
          ) : (
            <option value="Female">Female</option>
          )}
        </select>
        <label htmlFor="edit_age">Date of Birth:</label>
        <input
          type="date"
          id="edit_age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <label htmlFor="edit_country">Country of Residence:</label>
        <select
          id="edit_country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option disabled="disabled">Select a country...</option>
          {countries.map((element, index) => {
            return (
              <DrawCountries
                key={index}
                name={element['en_short_name']}
                current={country}
              />
            );
          })}
        </select>
        <label htmlFor="edit_address">Address:</label>
        <input
          type="text"
          id="edit_address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <label htmlFor="edit_homeland">Homeland:</label>
        <select
          id="edit_homeland"
          value={homeland}
          onChange={(e) => setHomeland(e.target.value)}
        >
          <option disabled="disabled" selected>
            Select a country...
          </option>
          {countries.map((element, index) => {
            return (
              <DrawCountries
                key={index}
                name={element['en_short_name']}
                current={homeland}
              />
            );
          })}
        </select>
        <label htmlFor="edit_nationality">Nationality:</label>
        <select
          id="edit_nationality"
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
        >
          <option disabled="disabled">Select a nationality...</option>
          {countries.map((element, index) => {
            return (
              <DrawCountries
                key={index}
                name={element['nationality']}
                current={nationality}
              />
            );
          })}
        </select>
        <label htmlFor="edit_languages">Language skills:</label>
        <input
          type="text"
          id="edit_languages"
          value={languages}
          onChange={(e) => setLanguages(e.target.value)}
        />
        <label htmlFor="edit_role">Role:</label>
        <select
          id="edit_role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          {role === 'GET' ? (
            <option value="GET" selected>
              In search
            </option>
          ) : (
            <option value="GET">In search</option>
          )}
          {role === 'GIVE' ? (
            <option value="GIVE" selected>
              Assistant
            </option>
          ) : (
            <option value="GIVE">Assistant</option>
          )}
        </select>
        <input type="submit" value="CONFIRM CHANGES" />
      </form>
    </section>
  );
};

export { EditProfile };
