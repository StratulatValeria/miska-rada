import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { IDocument } from "@/app/types/document";
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const jsonDirectory = path.join(process.cwd(), "app/data");
  const fileContents = await fs.readFile(
    jsonDirectory + "/documents.json",
    "utf8",
  );
  const documents: IDocument[] = JSON.parse(fileContents);

  const document = documents.find((doc) => doc.id === Number(id));

  if (!document) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(document);
}
