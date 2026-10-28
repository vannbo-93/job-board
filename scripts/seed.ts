/** @format */

import mongoose, { Types } from "mongoose";
import { JobModel } from "../lib/models/job.model";
import { ApplicationModel } from "../lib/models/application.model";

const jobs = [
  {
    title: "Senior Frontend Engineer",
    company: "NEXUS LABS",
    location: "Remote",
    type: "FULL-TIME",
    salary: "$4,000 – $5,500",
    tags: ["React", "TypeScript", "WebGL"],
    requirements: ["5+ years React", "TypeScript expert"],
    description:
      "Lead the frontend of a real-time data visualisation platform used by analysts worldwide.",
  },
  {
    title: "Backend Systems Architect",
    company: "DATAFORGE",
    location: "Casablanca",
    type: "FULL-TIME",
    salary: "$5,000 – $6,500",
    tags: ["Go", "Kubernetes", "gRPC"],
    requirements: ["Distributed systems", "Go in production"],
    description:
      "Design the services that move millions of events per day through our pipeline.",
  },
  {
    title: "ML Operations Engineer",
    company: "CORTEX AI",
    location: "Rabat",
    type: "FULL-TIME",
    salary: "$4,500 – $6,000",
    tags: ["Python", "MLOps", "AWS"],
    requirements: ["Model deployment", "AWS"],
    description:
      "Take machine learning models from notebooks to reliable production services.",
  },
  {
    title: "Product Designer",
    company: "PIXEL HARBOR",
    location: "Remote",
    type: "CONTRACT",
    salary: "$40 / hour",
    tags: ["Figma", "Design Systems"],
    requirements: ["Portfolio of shipped products"],
    description:
      "Own the design of our admin tools, from research to high-fidelity prototypes.",
  },
  {
    title: "Rust Systems Developer",
    company: "IRONCLAD",
    location: "Kenitra",
    type: "PART-TIME",
    salary: "$2,500 – $3,200",
    tags: ["Rust", "Linux"],
    requirements: ["Rust", "Systems programming"],
    description:
      "Build low-latency networking components for embedded devices.",
  },
  {
    title: "Junior Web Developer",
    company: "SAHARA SOFT",
    location: "Marrakech",
    type: "INTERNSHIP",
    salary: "$600",
    tags: ["HTML", "CSS", "JavaScript"],
    requirements: ["Eager to learn"],
    description:
      "Paid internship building client websites alongside senior developers.",
  },
];

const candidates = [
  { name: "Youssef Amrani", email: "youssef@example.com" },
  { name: "Salma Idrissi", email: "salma@example.com" },
  { name: "Karim Benali", email: "karim@example.com" },
  { name: "Nadia Ouazzani", email: "nadia@example.com" },
  { name: "Omar Tazi", email: "omar@example.com" },
  { name: "Hiba Lahlou", email: "hiba@example.com" },
].map((c) => ({ ...c, id: new Types.ObjectId() }));

// [candidate index, job index, aiScore, status]
const applications: [number, number, number, string][] = [
  [0, 0, 9.2, "SHORTLIST"],
  [1, 0, 8.7, "INTERVIEW"],
  [2, 1, 7.4, "REVIEW"],
  [3, 2, 9.5, "SHORTLIST"],
  [4, 3, 7.9, "REVIEW"],
  [5, 4, 6.1, "SUBMITTED"],
  [0, 2, 8.1, "INTERVIEW"],
  [2, 5, 5.4, "REJECTED"],
];

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");
  await mongoose.connect(uri);

  if (
    (await JobModel.countDocuments()) > 2 ||
    (await ApplicationModel.countDocuments()) > 0
  ) {
    console.log("Database already has data. Nothing was changed.");
    return;
  }

  const createdJobs = await JobModel.insertMany(jobs);

  await ApplicationModel.insertMany(
    applications.map(([c, j, aiScore, status]) => ({
      candidateId: candidates[c].id,
      candidateName: candidates[c].name,
      candidateEmail: candidates[c].email,
      jobId: createdJobs[j]._id,
      jobTitle: createdJobs[j].title,
      role: createdJobs[j].title,
      jobCompany: createdJobs[j].company,
      aiScore,
      status,
    })),
  );

  // Keep each job's applicants counter in sync with the inserted applications
  for (const job of createdJobs) {
    const count = await ApplicationModel.countDocuments({ jobId: job._id });
    await JobModel.updateOne({ _id: job._id }, { applicants: count });
  }

  console.log(
    `Inserted ${createdJobs.length} jobs and ${applications.length} applications.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
