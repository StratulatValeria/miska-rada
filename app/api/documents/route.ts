import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { IDocument } from "@/app/types/document";

export async function GET() {
  const jsonDirectory = path.join(process.cwd(), "app/data");
  const fileContents = await fs.readFile(
    jsonDirectory + "/documents.json",
    "utf8",
  );
  const documents: IDocument[] = JSON.parse(fileContents);

  return NextResponse.json(documents);
}
