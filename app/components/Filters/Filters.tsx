"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Icon } from "../UI/Icon/Icon";
import { Button } from "../UI/Button/Button";
import styles from "./Filters.module.css";

const Filters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/documents?${params.toString()}`, { scroll: false });
  };

  return (
    <div className={styles.container}>
      {/* Пошуковий рядок */}
      <div className={styles.searchWrapper}>
        <Icon name="icon-search" size={18} className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Пошук за назвою або номером..."
          className={styles.searchInput}
          onChange={(e) => updateParams("q", e.target.value)}
        />
      </div>

      <div className={styles.filterSection}>
        <h4 className={styles.sectionTitle}>Тип документа</h4>
        <div className={styles.checkboxGroup}>
          {["Рішення ради", "Розпорядження", "Наказ", "Протокол"].map(
            (type) => (
              <label key={type} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  onChange={() => updateParams("type", type)}
                />
                <span className={styles.checkmark}></span>
                {type}
              </label>
            ),
          )}
        </div>
      </div>

      <div className={styles.filterSection}>
        <h4 className={styles.sectionTitle}>Сфера діяльності</h4>
        <select
          className={styles.select}
          onChange={(e) => updateParams("sphere", e.target.value)}
        >
          <option value="">Всі сфери</option>
          <option value="Фінанси">Фінанси</option>
          <option value="Освіта">Освіта та Наука</option>
          <option value="Транспорт">Транспорт</option>
          <option value="ЖКГ">ЖКГ</option>
        </select>
      </div>

      <div className={styles.filterSection}>
        <h4 className={styles.sectionTitle}>Період</h4>
        <div className={styles.dateInputs}>
          <input type="date" className={styles.dateInput} title="Від" />
          <input type="date" className={styles.dateInput} title="До" />
        </div>
      </div>

      <Button variant="primary" className={styles.applyBtn} onClick={() => {}}>
        Застосувати фільтри
      </Button>

      <button
        className={styles.resetLink}
        onClick={() => router.push("/documents")}
      >
        Скинути налаштування
      </button>
    </div>
  );
};

export default Filters;
