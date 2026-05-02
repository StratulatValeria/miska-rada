import styles from "./Button.module.css";
import { Icon } from "@/app/components/UI/Icon/Icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  icon?: string;
}

export const Button = ({
  children,
  variant = "primary",
  icon,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${className}`}
      {...props}
    >
      {icon && <Icon name={icon} size={18} className={styles.btnIcon} />}
      {children}
    </button>
  );
};
