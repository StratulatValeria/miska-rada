import Link from "next/link";
import { Icon } from "@/app/components/UI/Icon/Icon";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.hero}>
      <div className={styles.arrowPointer}>
        <Icon name="icon-up-arrow" size={120} />
      </div>

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
