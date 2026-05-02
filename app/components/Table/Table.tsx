import { IDocument } from "@/app/types/document";
import styles from "./Table.module.css";
import { CustomLink } from "../UI/CustomLink/CustomLink";
import { Icon } from "../UI/Icon/Icon";

interface TableProps {
  data: IDocument[];
}

const Table = ({ data }: TableProps) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Номер / Дата</th>
            <th>Назва</th>
            <th>Тип</th>
            <th>Сфера</th>
            <th>Статус</th>
            <th>Файли</th>
          </tr>
        </thead>
        <tbody>
          {data.map((doc) => (
            <tr key={doc.id} className={styles.row}>
              <td className={styles.meta}>
                <span className={styles.number}>{doc.number}</span>
                <span className={styles.date}>
                  {new Date(doc.date).toLocaleDateString("uk-UA")}
                </span>
              </td>
              <td className={styles.title}>
                <CustomLink href={`/documents/${doc.id}`} scroll={false}>
                  {doc.title}
                </CustomLink>
              </td>
              <td>
                <span className={styles.typeTag}>{doc.type}</span>
              </td>
              <td>
                <span className={styles.sphereTag}>{doc.sphere}</span>
              </td>
              <td>
                <span
                  className={`${styles.status} ${styles[getStatusClass(doc.status)]}`}
                >
                  <Icon
                    name={
                      {
                        Прийнято: "icon-check",
                        "На розгляді": "icon-hour",
                        Скасовано: "icon-exlat",
                      }[doc.status] || "icon-hour"
                    }
                    size={28}
                  />
                  {doc.status}
                </span>
              </td>
              <td className={styles.files}>
                {doc.files.map((file, idx) => (
                  <a
                    key={idx}
                    href={file.url}
                    className={styles.fileLink}
                    download
                    title={`Завантажити ${file.type.toUpperCase()}`}
                  >
                    <Icon name={`icon-${file.type}`} size={44} />
                  </a>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const getStatusClass = (status: string) => {
  switch (status) {
    case "Прийнято":
      return "statusAccepted";
    case "На розгляді":
      return "statusPending";
    case "Скасовано":
      return "statusRejected";
    default:
      return "";
  }
};

export default Table;
