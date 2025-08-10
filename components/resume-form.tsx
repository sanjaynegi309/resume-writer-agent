"use client";

import { useState } from "react";
import { useResumeStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ExperienceItem } from "./experience-item";
import { EducationItem } from "./education-item";

export function ResumeForm() {
  const [loading, setLoading] = useState(false);
  const {
    personalInfo,
    summary,
    skills,
    experience,
    education,
    jobDescription,
    setPersonalInfo,
    setSummary,
    setSkills,
    addExperience,
    addEducation,
    setGeneratedResume,
    setJobDescription,
    setGeneratedCoverLetter,
  } = useResumeStore();

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalInfo({ ...personalInfo, [e.target.id]: e.target.value });
  };

  const generateSummary = async () => {
    setLoading(true);
    try {
      const prompt = `Generate a professional summary for a resume. The candidate's name is ${personalInfo.name}. Key skills include: ${skills}. The candidate has experience as: ${experience.map(e => e.role).join(', ')}.`;
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      if (data.text) {
        setSummary(data.text);
      }
    } catch (error) {
      console.error("Failed to generate summary:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateResume = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fullResumeData = useResumeStore.getState();
      const prompt = `
        Generate a professional resume in HTML format based on the following data.
        Use clean, semantic HTML with Tailwind CSS classes for styling.
        The output should be a single HTML block that can be rendered inside a div.

        Data:
        - Personal Info: ${JSON.stringify(fullResumeData.personalInfo)}
        - Summary: ${fullResumeData.summary}
        - Experience: ${JSON.stringify(fullResumeData.experience)}
        - Education: ${JSON.stringify(fullResumeData.education)}
        - Skills: ${fullResumeData.skills}

        Format the resume with clear sections for each part of the data.
      `;

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      if (data.text) {
        setGeneratedResume(data.text);
      }
    } catch (error) {
      console.error("Failed to generate resume:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateCoverLetter = async () => {
    setLoading(true);
    try {
      const fullResumeData = useResumeStore.getState();
      const prompt = `
        Generate a professional cover letter in HTML format based on the following resume data and job description.
        The output should be a single HTML block that can be rendered inside a div.

        Resume Data:
        - Personal Info: ${JSON.stringify(fullResumeData.personalInfo)}
        - Summary: ${fullResumeData.summary}
        - Experience: ${JSON.stringify(fullResumeData.experience)}
        - Education: ${JSON.stringify(fullResumeData.education)}
        - Skills: ${fullResumeData.skills}

        Job Description:
        ${jobDescription}
      `;

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      if (data.text) {
        setGeneratedCoverLetter(data.text);
      }
    } catch (error) {
      console.error("Failed to generate cover letter:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="w-full space-y-8" onSubmit={handleGenerateResume}>
      {/* ... other sections ... */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Personal Information</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={personalInfo.name}
              onChange={handlePersonalInfoChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john.doe@example.com"
              value={personalInfo.email}
              onChange={handlePersonalInfoChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              placeholder="(123) 456-7890"
              value={personalInfo.phone}
              onChange={handlePersonalInfoChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              placeholder="linkedin.com/in/johndoe"
              value={personalInfo.linkedin}
              onChange={handlePersonalInfoChange}
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Professional Summary</h2>
        <div className="space-y-2">
          <Label htmlFor="summary">Summary</Label>
          <Textarea
            id="summary"
            placeholder="A brief summary of your professional background..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
          <Button type="button" variant="outline" size="sm" onClick={generateSummary} disabled={loading}>
            {loading ? "Generating..." : "Generate with AI"}
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Work Experience</h2>
        <div className="space-y-4">
          {experience.map((_, index) => (
            <ExperienceItem key={index} index={index} />
          ))}
        </div>
        <Button type="button" variant="outline" onClick={addExperience}>
          Add Experience
        </Button>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Education</h2>
        <div className="space-y-4">
          {education.map((_, index) => (
            <EducationItem key={index} index={index} />
          ))}
        </div>
        <Button type="button" variant="outline" onClick={addEducation}>
          Add Education
        </Button>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Skills</h2>
        <div className="space-y-2">
          <Label htmlFor="skills">Skills</Label>
          <Textarea
            id="skills"
            placeholder="List your skills, separated by commas..."
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Cover Letter</h2>
        <div className="space-y-2">
          <Label htmlFor="jobDescription">Job Description</Label>
          <Textarea
            id="jobDescription"
            placeholder="Paste the job description here..."
            className="min-h-[150px]"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>
        <Button type="button" variant="outline" onClick={handleGenerateCoverLetter} disabled={loading}>
          {loading ? "Generating..." : "Generate Cover Letter"}
        </Button>
      </section>

      <div className="flex justify-end gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate Resume"}
        </Button>
      </div>
    </form>
  );
}
