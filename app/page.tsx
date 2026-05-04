import Link from "next/link";

import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.hero}>
      <div className={styles.overlay}>
        <div className={styles.container}>
          <h1 className={styles.title}>Ласкаво просимо до Міської Ради</h1>
          <p className={styles.subtitle}>
            Офіційний портал відкритих даних та документів громади
          </p>

          <Link href="/documents" className={styles.ctaButton}>
            Перейти до реєстру документів
          </Link>
        </div>
      </div>
    </main>
  );
}
