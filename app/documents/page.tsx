import Table from "@/app/components/Table/Table";
import Filters from "@/app/components/Filters/Filters";
import documentsData from "@/app/data/documents.json";
import { IDocument } from "@/app/types/document";
import styles from "./Documents.module.css";
import { Icon } from "@/app/components/UI/Icon/Icon";
import Link from "next/link";

export default async function DocumentsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const sParams = await searchParams;

  const ITEMS_PER_PAGE = 10;
  const currentPage = Number(sParams.page) || 1;

  const filteredData = (documentsData as unknown as IDocument[]).filter(
    (doc) => {
      const matchesQuery = sParams.q
        ? doc.title.toLowerCase().includes(sParams.q.toLowerCase()) ||
          doc.number.toLowerCase().includes(sParams.q.toLowerCase())
        : true;

      const matchesType = sParams.type ? doc.type === sParams.type : true;
      const matchesSphere = sParams.sphere
        ? doc.sphere === sParams.sphere
        : true;
      const matchesStatus = sParams.status
        ? doc.status === sParams.status
        : true;

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

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const getPageUrl = (page: number) => {
    const params = new URLSearchParams(sParams as Record<string, string>);
    params.set("page", page.toString());
    return `/documents?${params.toString()}`;
  };

  return (
    <main>
      <div className={styles.container}>
        <h1 className={styles.title}>Реєстр документів</h1>
        <Filters />

        {totalItems > 0 ? (
          <>
            <Table data={paginatedData} />

            {/* Блок пагінації */}
            {totalPages > 1 && (
              <div className={styles.pagination}>
                <Link
                  href={getPageUrl(currentPage - 1)}
                  className={`${styles.pageBtn} ${currentPage <= 1 ? styles.disabled : ""}`}
                >
                  <Icon name="icon-arrow-left" size={16} /> Попередня
                </Link>

                <div className={styles.pageInfo}>
                  Сторінка <strong>{currentPage}</strong> з {totalPages}
                </div>

                <Link
                  href={getPageUrl(currentPage + 1)}
                  className={`${styles.pageBtn} ${currentPage >= totalPages ? styles.disabled : ""}`}
                >
                  Наступна <Icon name="icon-arrow-right" size={16} />
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className={styles.emptyState}>
            <Icon name="icon-search" size={64} className={styles.emptyIcon} />
            <h2>Документів не знайдено</h2>
            <p>
              За вашим запитом нічого не знайдено. Спробуйте змінити фільтри.
            </p>
            <Link href="/documents" className={styles.resetLink}>
              Скинути всі фільтри
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
