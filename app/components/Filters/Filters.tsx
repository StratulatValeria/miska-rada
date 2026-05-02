"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Icon } from "../UI/Icon/Icon";
import { Loader } from "../UI/Loader/Loader";
import styles from "./Filters.module.css";
import { Select } from "../UI/Select/Select";
import { useTransition } from "react";
import { Input } from "../UI/Input/Input";
import { Button } from "../UI/Button/Button";
import { useEffect, useState } from "react";

const Filters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState(searchParams.get("q") || "");

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    startTransition(() => {
      router.push(`/documents?${params.toString()}`, { scroll: false });
    });
  };

  const handleReset = () => {
    setSearchValue("");
    startTransition(() => {
      router.push("/documents", { scroll: false });
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchValue !== (searchParams.get("q") || "")) {
        updateParams("q", searchValue);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchValue]);

  return (
    <div className={styles.container}>
      {/* 1. Пошук  */}
      <div className={styles.searchWrapper}>
        <Input
          icon={<Icon name="icon-search" size={18} />}
          type="text"
          placeholder="Пошук за назвою або номером..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      {/* 2. Тип документа  */}
      <div className={styles.filterSection}>
        <h4 className={styles.sectionTitle}>Тип документа</h4>
        <Select
          options={[
            { value: "", label: "Всі типи" },
            { value: "Рішення", label: "Рішення ради" },
            { value: "Розпорядження", label: "Розпорядження" },
          ]}
          value={searchParams.get("type") || ""}
          onChange={(e) => updateParams("type", e.target.value)}
        />
      </div>

      {/* 3. Сфера діяльності  */}
      <div className={styles.filterSection}>
        <h4 className={styles.sectionTitle}>Сфера діяльності</h4>
        <div className={styles.checkboxGroup}>
          {["Фінанси", "Освіта та Наука", "Транспорт"].map((sphere) => (
            <label key={sphere} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={searchParams.get("sphere") === sphere}
                onChange={() =>
                  updateParams(
                    "sphere",
                    searchParams.get("sphere") === sphere ? "" : sphere,
                  )
                }
              />
              {sphere}
            </label>
          ))}
        </div>
      </div>

      {/* 4. Дата  */}
      <div className={styles.filterSection}>
        <h4 className={styles.sectionTitle}>Дата</h4>
        <div className={styles.dateInputs}>
          <input
            type="date"
            className={styles.dateInput}
            value={searchParams.get("from") || ""}
            max={searchParams.get("to") || undefined}
            onChange={(e) => updateParams("from", e.target.value)}
          />
          <span>/</span>
          <input
            type="date"
            className={styles.dateInput}
            value={searchParams.get("to") || ""}
            min={searchParams.get("from") || undefined}
            onChange={(e) => updateParams("to", e.target.value)}
          />
        </div>
      </div>

      {/* 5. Статус */}
      <div className={styles.filterSection}>
        <h4 className={styles.sectionTitle}>Статус</h4>
        <div className={styles.checkboxGroup}>
          {["Прийнято", "На розгляді", "Скасовано"].map((status) => (
            <label key={status} className={styles.checkboxLabel}>
              <input
                type="radio"
                name="status"
                checked={searchParams.get("status") === status}
                onChange={() => updateParams("status", status)}
              />
              {status}
            </label>
          ))}
        </div>
      </div>
      <div className={styles.actionsWrapper}>
        {isPending && (
          <div className={styles.loaderOverlay}>
            <Loader />
          </div>
        )}
        <Button> Пошук </Button>
        <button className={styles.resetBtn} onClick={handleReset}>
          Скинути
        </button>
      </div>
    </div>
  );
};
export default Filters;
