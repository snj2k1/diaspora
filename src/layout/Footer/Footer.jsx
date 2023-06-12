import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__copyright}>
        <span>©TFS{new Date().getFullYear()}</span>
      </div>
    </footer>
  );
};

export { Footer };
