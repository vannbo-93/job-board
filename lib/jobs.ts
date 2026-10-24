/** @format */

import { Job } from "@/types/Job";

export const jobs: Job[] = [
  {
    id: "1",
    title: "Frontend Engineer",
    company: "NORTHWIND LABS",
    location: "Remote",
    type: "FULL-TIME",
    salary: "$4,000 – $5,500",
    tags: ["React", "Next.js", "Tailwind"],
    postedAt: "2026-10-20",
    applicants: 47,
    description:
      "We are looking for a Frontend Engineer with 3 years of experience in React, Next.js, and Tailwind CSS.",
    requirements: [
      "3+ years with React and TypeScript",
      "Experience with Next.js App Router",
      "Comfortable with Tailwind CSS",
    ],
  },
  {
    id: "2",
    title: "Backend Developer",
    company: "CEDAR SYSTEMS",
    location: "Casablanca",
    type: "FULL-TIME",
    salary: "$3,000 – $4,200",
    tags: ["Node.js", "Express", "MongoDB"],
    postedAt: "2026-10-20",
    applicants: 47,
    description:
      "Build and maintain REST APIs for a growing logistics platform.",
    requirements: [
      "3+ years with React and TypeScript",
      "Experience with Next.js App Router",
      "Comfortable with Tailwind CSS",
    ],
  },
  {
    id: "3",
    title: "Full Stack Developer",
    company: "ATLAS DIGITAL",
    location: "Remote",
    type: "CONTRACT",
    salary: "$35 / hour",
    tags: ["TypeScript", "React", "PostgreSQL"],
    postedAt: "2026-10-20",
    applicants: 47,
    description:
      "Six-month contract to rebuild an internal dashboard end to end.",
    requirements: [
      "3+ years with React and TypeScript",
      "Experience with Next.js App Router",
      "Comfortable with Tailwind CSS",
    ],
  },
  {
    id: "4",
    title: "UI Engineer",
    company: "PIXEL HARBOR",
    location: "Rabat",
    type: "PART-TIME",
    salary: "$1,800 – $2,400",
    tags: ["Figma", "React", "Accessibility"],
    postedAt: "2026-10-20",
    applicants: 47,
    description:
      "Turn design files into accessible, reusable React components.",
    requirements: [
      "3+ years with React and TypeScript",
      "Experience with Next.js App Router",
      "Comfortable with Tailwind CSS",
    ],
  },
  {
    id: "5",
    title: "Junior Web Developer",
    company: "SAHARA SOFT",
    location: "Kenitra",
    type: "INTERNSHIP",
    salary: "$600",
    tags: ["HTML", "CSS", "JavaScript"],
    postedAt: "2026-10-20",
    applicants: 47,
    description: "Paid internship for a motivated junior developer.",
    requirements: [
      "3+ years with React and TypeScript",
      "Experience with Next.js App Router",
      "Comfortable with Tailwind CSS",
    ],
  },
];

export function getJob(id: string) {
  return jobs.find((job) => job.id === id);
}
