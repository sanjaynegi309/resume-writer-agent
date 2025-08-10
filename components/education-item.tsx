"use client";

import { useResumeStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EducationItemProps {
  index: number;
}

export function EducationItem({ index }: EducationItemProps) {
  const { education, updateEducation, removeEducation } = useResumeStore();
  const edu = education[index];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateEducation(index, { ...edu, [e.target.id]: e.target.value });
  };

  return (
    <div className="space-y-4 rounded-lg border p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="degree">Degree</Label>
          <Input id="degree" value={edu.degree} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="school">School</Label>
          <Input id="school" value={edu.school} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="month"
            value={edu.startDate}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            type="month"
            value={edu.endDate}
            onChange={handleChange}
          />
        </div>
      </div>
      <Button
        type="button"
        variant="destructive"
        onClick={() => removeEducation(index)}
      >
        Remove Education
      </Button>
    </div>
  );
}
