"use client";

import { useResumeStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ExperienceItemProps {
  index: number;
}

export function ExperienceItem({ index }: ExperienceItemProps) {
  const { experience, updateExperience, removeExperience } = useResumeStore();
  const exp = experience[index];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    updateExperience(index, { ...exp, [e.target.id]: e.target.value });
  };

  return (
    <div className="space-y-4 rounded-lg border p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Input id="role" value={exp.role} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input id="company" value={exp.company} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="month"
            value={exp.startDate}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            type="month"
            value={exp.endDate}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={exp.description}
          onChange={handleChange}
        />
      </div>
      <Button
        type="button"
        variant="destructive"
        onClick={() => removeExperience(index)}
      >
        Remove Experience
      </Button>
    </div>
  );
}
