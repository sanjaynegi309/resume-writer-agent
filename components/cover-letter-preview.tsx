"use client";

import { useRef } from "react";
import { useResumeStore } from "@/lib/store";
import { Button } from "./ui/button";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import htmlToDocx from "html-to-docx";

export function CoverLetterPreview() {
  const coverLetterRef = useRef<HTMLDivElement>(null);
  const { generatedCoverLetter } = useResumeStore();

  const exportToPdf = async () => {
    if (!coverLetterRef.current) return;
    const canvas = await html2canvas(coverLetterRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("cover-letter.pdf");
  };

  const exportToDocx = async () => {
    if (!generatedCoverLetter) return;
    const fileBuffer = await htmlToDocx(generatedCoverLetter, undefined, {
      font: "Calibri",
      fontSize: "12",
    });
    saveAs(fileBuffer as Blob, "cover-letter.docx");
  };

  if (!generatedCoverLetter) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl space-y-4 mt-8">
      <h2 className="text-2xl font-bold">Generated Cover Letter</h2>
      <div
        ref={coverLetterRef}
        className="prose dark:prose-invert rounded-lg border bg-card p-6"
        dangerouslySetInnerHTML={{ __html: generatedCoverLetter }}
      />
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={exportToPdf}>Export to PDF</Button>
        <Button variant="outline" onClick={exportToDocx}>Export to DOCX</Button>
      </div>
    </div>
  );
}
