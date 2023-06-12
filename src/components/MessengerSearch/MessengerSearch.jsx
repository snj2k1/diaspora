import styles from './MessengerSearch.module.css';

const MessengerSearch = (props) => {
  const handleChange = (e) => {
    props.setSearch(e.target.value);
  };

  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="Find a user"
        onChange={handleChange}
        value={props.search}
      />
    </div>
  );
};

export { MessengerSearch };
