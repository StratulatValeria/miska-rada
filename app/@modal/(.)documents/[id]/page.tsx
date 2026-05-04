"use client";

import { useRouter } from "next/navigation";
import { use } from "react";
import documentsData from "@/app/data/documents.json";
import { IDocument } from "@/app/types/document";
import { Icon } from "@/app/components/UI/Icon/Icon";
import styles from "./Modal.module.css";

export default function DocumentModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const doc = (documentsData as unknown as IDocument[]).find(
    (d) => d.id === Number(id),
  );

  if (!doc) return null;

  return (
    <div className={styles.overlay} onClick={() => router.back()}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeBtn}
          onClick={() => router.back()}
          aria-label="Закрити"
        >
          <Icon name="icon-close" size={20} />
        </button>

        <div className={styles.content}>
          <header className={styles.header}>
            <span className={styles.typeBadge}>{doc.type}</span>
            <h2 className={styles.title}>{doc.title}</h2>
          </header>

          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Номер:</span>
              <span className={styles.detailValue}>{doc.number}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Дата:</span>
              <span className={styles.detailValue}>
                {new Date(doc.date).toLocaleDateString("uk-UA")}
              </span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Сфера:</span>
              <span className={styles.detailValue}>{doc.sphere}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Статус:</span>
              <span className={`${styles.detailValue} ${styles.statusText}`}>
                {doc.status}
              </span>
            </div>
          </div>

          <div className={styles.description}>
            <h4 className={styles.sectionTitle}>Короткий зміст</h4>
            <div className={styles.textContent}>
              {doc.content || "Опис документа наразі відсутній."}
            </div>
          </div>

          {doc.files && doc.files.length > 0 && (
            <div className={styles.filesSection}>
              <h4 className={styles.sectionTitle}>Прикріплені файли</h4>
              <div className={styles.fileList}>
                {doc.files.map((file, idx) => (
                  <a
                    key={idx}
                    href={file.url}
                    className={styles.fileLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon name={`icon-pdf`} size={24} />
                    <div className={styles.fileInfo}>
                      <span className={styles.fileName}>
                        Документ у форматі {file.type.toUpperCase()}
                      </span>
                      <span className={styles.fileAction}>Завантажити</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
