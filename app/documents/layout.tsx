import React from "react";

export default function DocumentsLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal?: React.ReactNode;
}) {
  return (
    <div className="documents-container">
      {children}

      {modal}
    </div>
  );
}
