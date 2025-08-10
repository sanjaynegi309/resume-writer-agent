import { GoogleGenerativeAI } from "@google/generative-ai";
import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ error: "Gemini API key not found" }, { status: 500 });
  }

  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error(error);
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: `Failed to generate content: ${errorMessage}` }, { status: 500 });
  }
}
