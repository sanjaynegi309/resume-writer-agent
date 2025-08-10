import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "Gemini API key not found" }, { status: 500 });
    }

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Second try...catch specifically for the API call
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      return NextResponse.json({ text });
    } catch (apiError) {
      console.error("Gemini API Error:", apiError);
      let errorMessage = "An unknown API error occurred";
      if (apiError instanceof Error) {
        errorMessage = apiError.message;
      }
      return NextResponse.json({ error: `Failed to generate content due to API error: ${errorMessage}` }, { status: 500 });
    }
  } catch (requestError) {
    console.error("Request Handling Error:", requestError);
    let errorMessage = "An unknown request error occurred";
    if (requestError instanceof Error) {
      errorMessage = requestError.message;
    }
    // This will catch errors from req.json() if the body is malformed, for example.
    return NextResponse.json({ error: `Failed to handle request: ${errorMessage}` }, { status: 500 });
  }
}
