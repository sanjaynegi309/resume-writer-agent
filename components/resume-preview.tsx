"use client";

import { useRef } from "react";
import { useResumeStore } from "@/lib/store";
import { Button } from "./ui/button";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import htmlToDocx from "html-to-docx";

export function ResumePreview() {
  const resumeRef = useRef<HTMLDivElement>(null);
  const { generatedResume } = useResumeStore();

  const exportToPdf = async () => {
    if (!resumeRef.current) return;
    const canvas = await html2canvas(resumeRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("resume.pdf");
  };

  const exportToDocx = async () => {
    if (!generatedResume) return;
    const fileBuffer = await htmlToDocx(generatedResume, undefined, {
      font: "Calibri",
      fontSize: "12",
      table: {
        row: {
          cantSplit: true,
        },
      },
    });
    saveAs(fileBuffer as Blob, "resume.docx");
  };

  if (!generatedResume) {
    return (
      <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed bg-muted">
        <p className="text-muted-foreground">Your generated resume will appear here.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl space-y-4">
      <div
        ref={resumeRef}
        className="prose dark:prose-invert rounded-lg border bg-card p-6"
        dangerouslySetInnerHTML={{ __html: generatedResume }}
      />
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={exportToPdf}>Export to PDF</Button>
        <Button variant="outline" onClick={exportToDocx}>Export to DOCX</Button>
      </div>
    </div>
  );
}
