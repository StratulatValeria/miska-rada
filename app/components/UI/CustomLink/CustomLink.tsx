import Link, { LinkProps } from "next/link";
import styles from "./CustomLink.module.css";

interface CustomLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  underline?: boolean;
}

export const CustomLink = ({
  children,
  underline = true,
  className,
  ...props
}: CustomLinkProps) => {
  return (
    <Link
      {...props}
      className={`${styles.link} ${underline ? styles.underline : ""} ${className}`}
    >
      {children}
    </Link>
  );
};
