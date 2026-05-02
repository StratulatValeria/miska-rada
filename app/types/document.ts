export interface DocumentFile {
  type: "pdf" | "doc" | "xls";
  url: string;
}

export interface IDocument {
  id: number;
  number: string;
  date: string;
  title: string;
  type: string;
  sphere: string;
  status: "Прийнято" | "На розгляді" | "Скасовано";
  content: string;
  files: DocumentFile[];
}
