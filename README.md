# AI-Powered Resume Writer Agent

This is a smart, agentic resume-writing assistant powered by Google Gemini. This agent helps users craft compelling, personalized resumes and cover letters tailored to their career goals, experience level, and target job roles.

## Core Features

-   **Interactive Resume Form:** A step-by-step wizard to gather user details (name, contact, experience, skills, education).
-   **AI-Powered Content Generation:**
    -   Generate a professional summary with one click.
    -   Generate a complete, formatted resume based on user input.
    -   Generate a personalized cover letter based on the resume and a job description.
-   **Live Preview:** See a live preview of the generated resume and cover letter.
-   **Export Options:** Export the final resume and cover letter to both PDF and DOCX formats.
-   **Persistent State:** Your data is automatically saved in your browser, so you can pick up where you left off.
-   **Dark/Light Mode:** Toggle between themes for comfortable viewing.

## Technical Requirements

-   **Frontend:** Next.js 14 with App Router, TypeScript, Tailwind CSS
-   **State Management:** Zustand with `persist` middleware for `localStorage`.
-   **AI Integration:** Google Gemini API integrated via Next.js API routes.
-   **UI Components:** Built with Radix UI primitives and styled with Tailwind CSS, following the shadcn/ui pattern.

## Getting Started

### Prerequisites

-   Node.js (v18 or later)
-   npm or yarn
-   A Google Gemini API key. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env.local` in the root of the project and add your Gemini API key:
    ```
    GEMINI_API_KEY=your_gemini_api_key_here
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to Use

1.  **Fill out the form:** Start by filling in your personal information, professional summary, work experience, education, and skills.
2.  **Use AI Assistance:**
    -   Click "Generate with AI" under the summary section to get a professionally written summary.
    -   Fill in all your details and click "Generate Resume" to see a full resume preview.
3.  **Generate a Cover Letter:**
    -   Paste a job description into the cover letter section.
    -   Click "Generate Cover Letter" to get a tailored letter.
4.  **Export:** Use the "Export to PDF" or "Export to DOCX" buttons to download your documents.

## Project Structure

-   `app/`: The main application code, using the Next.js App Router.
    -   `api/generate/route.ts`: The backend API route for handling calls to the Gemini API.
    -   `page.tsx`: The main page component.
    -   `layout.tsx`: The root layout for the application.
-   `components/`: Reusable React components.
    -   `ui/`: Basic UI primitives like `Button`, `Input`, etc.
    -   `resume-form.tsx`: The main form component for user input.
    -   `resume-preview.tsx`: The component for displaying the generated resume.
    -   `cover-letter-preview.tsx`: The component for displaying the generated cover letter.
-   `lib/`: Utility functions and the Zustand store.
    -   `store.ts`: The central Zustand store with persistence middleware.
-   `public/`: Static assets.
-   `.env.local.example`: An example of the environment variables file.
