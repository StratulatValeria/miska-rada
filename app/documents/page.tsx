import { IDocument } from "../types/document";
import styles from "./Documents.module.css";
import Table from "@/app/components/Table/Table";
import Filters from "@/app/components/Filters/Filters";

async function getDocuments(): Promise<IDocument[]> {
  const res = await fetch("http://localhost:3000/api/documents", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Не вдалося завантажити документи");
  }

  return res.json();
}

export default async function DocumentsPage() {
  const documents = await getDocuments();

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.title}>Реєстр документів</h1>

      <div className={styles.content}>
        <aside className={styles.sidebar}>
          <Filters />
        </aside>

        <section className={styles.main}>
          <Table data={documents} />
        </section>
      </div>
    </div>
  );
}
