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
        <button className={styles.closeBtn} onClick={() => router.back()}>
          <Icon name="icon-close" size={24} />
        </button>

        <div className={styles.content}>
          <span className={styles.typeBadge}>{doc.type}</span>
          <h2>{doc.title}</h2>
          <hr />
          <div className={styles.details}>
            <p>
              <strong>Номер:</strong> {doc.number}
            </p>
            <p>
              <strong>Дата:</strong>{" "}
              {new Date(doc.date).toLocaleDateString("uk-UA")}
            </p>
            <p>
              <strong>Сфера:</strong> {doc.sphere}
            </p>
          </div>
          <div className={styles.textPreview}>{doc.content}</div>
        </div>
      </div>
    </div>
  );
}
