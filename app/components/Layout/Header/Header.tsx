import Link from "next/link";
import { Logo } from "@/app/components/UI/Logo/Logo";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logoLink}>
          <Logo />
        </Link>

        <nav className={styles.nav}>
          <Link href="/documents" className={styles.navLink}>
            Документи
          </Link>
          <Link href="/news" className={styles.navLink}>
            Новини
          </Link>
          <Link href="/contacts" className={styles.navLink}>
            Контакти
          </Link>
        </nav>

        <div className={styles.actions}>
          <button className={styles.searchBtn}>
            <span>Пошук</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
