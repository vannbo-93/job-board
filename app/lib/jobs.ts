/** @format */

export type Job = {
  id: string;
  title: string;
  location: string;
  description: string;
};

export const jobs: Job[] = [
  {
    id: "1",
    title: "Frontend Engineer",
    location: "Remote Position",
    description:
      "We are looking for a Frontend Engineer with 3 years of experience in React, Next.js, and Tailwind CSS.",
  },
];

export function getJob(id: string) {
  return jobs.find((job) => job.id === id);
}
