/** @format */

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "FULL-TIME" | "PART-TIME" | "CONTRACT" | "INTERNSHIP";
  salary: string;
  tags: string[];
  description: string;
  postedAt: string; // تاريخ بصيغة ISO مثل "2026-10-20"
  applicants: number;
};
