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
};
