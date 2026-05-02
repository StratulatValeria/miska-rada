import Table from "@/app/components/Table/Table";
import Filters from "@/app/components/Filters/Filters";
import documentsData from "@/app/data/documents.json";
import { IDocument } from "@/app/types/document";
import styles from "./Documents.module.css";

export default async function DocumentsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const sParams = await searchParams;

  const filteredData = (documentsData as unknown as IDocument[]).filter(
    (doc) => {
      const matchesQuery = sParams.q
        ? doc.title.toLowerCase().includes(sParams.q.toLowerCase()) ||
          doc.number.toLowerCase().includes(sParams.q.toLowerCase())
        : true;

      // 2. Тип документа
      const matchesType = sParams.type ? doc.type === sParams.type : true;

      // 3. Сфера діяльності
      const matchesSphere = sParams.sphere
        ? doc.sphere === sParams.sphere
        : true;

      // 4. Статус
      const matchesStatus = sParams.status
        ? doc.status === sParams.status
        : true;

      // 5. Дати
      const fromDate = sParams.from ? new Date(sParams.from) : null;
      const toDate = sParams.to ? new Date(sParams.to) : null;
      const docDate = new Date(doc.date);

      const matchesDate =
        (!fromDate || docDate >= fromDate) && (!toDate || docDate <= toDate);
      return (
        matchesQuery &&
        matchesType &&
        matchesSphere &&
        matchesStatus &&
        matchesDate
      );
    },
  );

  return (
    <main>
      <div className={styles.container}>
        <h1 className={styles.title}>Реєстр документів</h1>
        <Filters />
        <Table data={filteredData} />
      </div>
    </main>
  );
}
