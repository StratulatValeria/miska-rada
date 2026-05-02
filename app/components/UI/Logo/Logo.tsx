import styles from "./Logo.module.css";

export const Logo = () => {
  return (
    <div className={styles.logoWrapper}>
      <svg className={styles.icon}>
        <use xlinkHref="/sprite.svg#icon-logo" />
      </svg>
      <div className={styles.textBlock}>
        <span className={styles.city}>СЛОВ`ЯНСЬК</span>
        <span className={styles.authority}>МІСЬКА РАДА</span>
      </div>
    </div>
  );
};
