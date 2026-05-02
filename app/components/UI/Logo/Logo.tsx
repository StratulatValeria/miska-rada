import styles from "./Logo.module.css";

export const Logo = () => {
  return (
    <div className={styles.logoWrapper}>
      <svg className={styles.icon}>
        <use xlinkHref="/symbol-defs.svg#icon-logo" />
      </svg>
      <div className={styles.textBlock}>
        <span className={styles.city}>СЛОВ`ЯНСЬКА</span>
        <span className={styles.authority}>МІСЬКА РАДА</span>
      </div>
    </div>
  );
};
