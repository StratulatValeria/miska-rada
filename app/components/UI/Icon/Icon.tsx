import styles from "./Icon.module.css";

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export const Icon = ({ name, className, size = 24 }: IconProps) => {
  return (
    <svg
      className={`${styles.icon} ${className}`}
      style={{ width: size, height: size }}
    >
      <use xlinkHref={`/public/symbol-defs.svg#${name}`} />
    </svg>
  );
};
