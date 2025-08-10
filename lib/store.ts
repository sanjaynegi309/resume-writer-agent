import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
}

interface WorkExperience {
  company: string;
  role: string;
  startDate: string;
  endDate:string;
  description: string;
}

interface Education {
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
}

interface ResumeState {
  personalInfo: PersonalInfo;
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: string;
  setPersonalInfo: (personalInfo: PersonalInfo) => void;
  setSummary: (summary: string) => void;
  addExperience: () => void;
  updateExperience: (index: number, exp: WorkExperience) => void;
  removeExperience: (index: number) => void;
  addEducation: () => void;
  updateEducation: (index: number, edu: Education) => void;
  removeEducation: (index: number) => void;
  setSkills: (skills: string) => void;
  generatedResume: string;
  setGeneratedResume: (resume: string) => void;
  jobDescription: string;
  setJobDescription: (jd: string) => void;
  generatedCoverLetter: string;
  setGeneratedCoverLetter: (cl: string) => void;
}

export const useResumeStore = create<ResumeState>(
  persist(
    (set) => ({
      personalInfo: { name: '', email: '', phone: '', linkedin: '' },
      summary: '',
      experience: [],
      education: [],
      skills: '',
      jobDescription: '',
      generatedCoverLetter: '',
      generatedResume: '',
      setPersonalInfo: (personalInfo) => set({ personalInfo }),
      setSummary: (summary) => set({ summary }),
      addExperience: () =>
        set((state) => ({
          experience: [
            ...state.experience,
            { company: '', role: '', startDate: '', endDate: '', description: '' },
          ],
        })),
      updateExperience: (index, exp) =>
        set((state) => ({
          experience: state.experience.map((e, i) => (i === index ? exp : e)),
        })),
      removeExperience: (index) =>
        set((state) => ({
          experience: state.experience.filter((_, i) => i !== index),
        })),
      addEducation: () =>
        set((state) => ({
          education: [
            ...state.education,
            { school: '', degree: '', startDate: '', endDate: '' },
          ],
        })),
      updateEducation: (index, edu) =>
        set((state) => ({
          education: state.education.map((e, i) => (i === index ? edu : e)),
        })),
      removeEducation: (index) =>
        set((state) => ({
          education: state.education.filter((_, i) => i !== index),
        })),
      setSkills: (skills) => set({ skills }),
      setGeneratedResume: (resume) => set({ generatedResume: resume }),
      setJobDescription: (jd) => set({ jobDescription: jd }),
      setGeneratedCoverLetter: (cl) => set({ generatedCoverLetter: cl }),
    }),
    {
      name: 'resume-storage', // name of the item in the storage (must be unique)
    }
  )
);
