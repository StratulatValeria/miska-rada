"use client";

import { ReactNode } from "react";
import styles from "./Input.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
}

export const Input = ({ icon, className, ...props }: InputProps) => {
  return (
    <div className={styles.inputWrapper}>
      {icon && <div className={styles.iconContainer}>{icon}</div>}
      <input
        className={`${styles.input} ${icon ? styles.withIcon : ""} ${className || ""}`}
        {...props}
      />
    </div>
  );
};
