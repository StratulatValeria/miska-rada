import Link from "next/link";
import { Icon } from "../UI/Icon/Icon";
import styles from "./Placeholder.module.css";

export const Placeholder = ({ title }: { title: string }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.iconWrapper}>
          <Icon name="icon-cat" size={120} />
        </div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.text}>
          Розробник вже заварив каву і скоро візьметься за цей розділ. А поки що
          ви можете переглянути реєстр документів.
        </p>
        <Link href="/documents" className={styles.link}>
          Повернутися до документів
        </Link>
      </div>
    </div>
  );
};
