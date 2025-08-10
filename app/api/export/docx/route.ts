import { NextRequest, NextResponse } from 'next/server';
import htmlToDocx from 'html-to-docx';

export async function POST(req: NextRequest) {
  try {
    const { htmlContent } = await req.json();

    if (!htmlContent) {
      return NextResponse.json({ error: 'HTML content is required' }, { status: 400 });
    }

    const fileBuffer = await htmlToDocx(htmlContent, undefined, {
      font: 'Calibri',
      fontSize: '12',
      table: {
        row: {
          cantSplit: true,
        },
      },
    });

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'attachment; filename=document.docx',
      },
    });
  } catch (error) {
    console.error('Failed to generate DOCX:', error);
    return NextResponse.json({ error: 'Failed to generate DOCX file' }, { status: 500 });
  }
}
