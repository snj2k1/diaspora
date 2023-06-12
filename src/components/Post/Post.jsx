import styles from './Post.module.css';

const Post = (props) => {
  const { displayName: name, timestamp: time, input: value } = props.data;

  return (
    <li className={styles.posts__item}>
      <div className={styles.post_header}>
        <img className={styles.post_img} src={props.photo} alt={name} />
        <div className={styles.post_info}>
          <span className={styles.post_name}>{name}</span>
          <span className={styles.post_time}>
            {time && time.toDate().toLocaleString()}
          </span>
        </div>
      </div>
      <div className={styles.post_content}>{value}</div>
    </li>
  );
};

export { Post };
