import styles from './ProfileInfo.module.css';

const ProfileInfo = (props) => {
  const {
    country,
    nationality,
    //role,
    gender,
    age,
    address,
    homeland,
    languages,
    about,
  } = props.info;

  return (
    <div className={styles.profile__desc_info}>
      <div className={styles.profile__desc_title}>About me:</div>
      {about ? (
        <p className={styles.profile__desc_info_about}>{about}</p>
      ) : (
        <p className={styles.profile__desc_info_about}>No description</p>
      )}
      <div className={styles.profile__desc_title}>Information:</div>
      <ul className={styles.profile__desc_info_list}>
        {gender && (
          <li className={styles.profile__desc_info_item}>
            <span>Gender:</span>
            <span>{gender}</span>
          </li>
        )}
        {age && (
          <li className={styles.profile__desc_info_item}>
            <span>Age:</span>
            <span>
              {new Date().getFullYear() - new Date(age).getFullYear()}
            </span>
          </li>
        )}
        {country && (
          <li className={styles.profile__desc_info_item}>
            <span>Country:</span>
            <span>{country}</span>
          </li>
        )}
        {address && (
          <li className={styles.profile__desc_info_item}>
            <span>Address:</span>
            <span>{address}</span>
          </li>
        )}
        {homeland && (
          <li className={styles.profile__desc_info_item}>
            <span>Homeland:</span>
            <span>{homeland}</span>
          </li>
        )}
        {nationality && (
          <li className={styles.profile__desc_info_item}>
            <span>Nationality:</span>
            <span>{nationality}</span>
          </li>
        )}
        {languages && (
          <li className={styles.profile__desc_info_item}>
            <span>Language skills:</span>
            <span>{languages}</span>
          </li>
        )}
      </ul>
    </div>
  );
};

export { ProfileInfo };
