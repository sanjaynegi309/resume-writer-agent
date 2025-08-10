import { Header } from "@/components/header";
import { ResumeForm } from "@/components/resume-form";
import { ResumePreview } from "@/components/resume-preview";
import { CoverLetterPreview } from "@/components/cover-letter-preview";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 p-4">
        <div className="container relative grid gap-8 lg:grid-cols-2">
          <section className="flex flex-col items-start gap-8 py-8 md:py-12 lg:py-24">
            <div className="w-full">
              <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
                Create Your Resume
              </h1>
              <p className="text-muted-foreground sm:text-lg">
                Fill in the form to get started.
              </p>
            </div>
            <ResumeForm />
          </section>
          <section className="py-8 md:py-12 lg:py-24">
            <ResumePreview />
            <CoverLetterPreview />
          </section>
        </div>
      </main>
    </div>
  );
}
