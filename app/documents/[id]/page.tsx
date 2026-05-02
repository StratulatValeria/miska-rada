import { IDocument } from "@/app/types/document";
import documentsData from "@/app/data/documents.json";
import { notFound } from "next/navigation";
import { Button } from "@/app/components/UI/Button/Button";
import { Icon } from "@/app/components/UI/Icon/Icon";
import styles from "./SingleDocument.module.css";

interface PageProps {
  params: { id: string };
}

export default function DocumentPage({ params }: PageProps) {
  const document = (documentsData as IDocument[]).find(
    (doc) => doc.id === Number(params.id),
  );

  if (!document) {
    notFound();
  }

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <div className={styles.meta}>
          <span className={styles.badge}>{document.type}</span>
          <h1 className={styles.title}>{document.title}</h1>
          <p className={styles.info}>
            Номер: <strong>{document.number}</strong> від{" "}
            {new Date(document.date).toLocaleDateString("uk-UA")}
          </p>
        </div>
        <Button variant="primary" icon="icon-download">
          Завантажити все
        </Button>
      </header>

      <div className={styles.grid}>
        <section className={styles.content}>
          <h3>Текст документа</h3>
          <div className={styles.textBlock}>{document.content}</div>
        </section>

        <aside className={styles.details}>
          <div className={styles.card}>
            <h4>Деталі</h4>
            <p>
              <span>Сфера:</span> {document.sphere}
            </p>
            <p>
              <span>Статус:</span> {document.status}
            </p>
          </div>

          <div className={styles.filesCard}>
            <h4>Прикріплені файли</h4>
            {document.files.map((file, idx) => (
              <a key={idx} href={file.url} className={styles.fileRow}>
                <Icon name={`icon-${file.type}`} size={24} />
                <span>Документ .{file.type}</span>
              </a>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}
