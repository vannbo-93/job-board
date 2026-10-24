/** @format */

"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { Job } from "@/types";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/textarea";
import { BrutalSelect } from "@/components/BrutalUI";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  handleUpdateJob,
  type CreateJobState,
} from "@/app/actions/jobs/jobs.action";

function EditJobForm({ job }: { job: Job }) {
  const [state, formAction, isPending] = useActionState<
    CreateJobState,
    FormData
  >(handleUpdateJob.bind(null, job.id), undefined);

  // After a failed submit use what the admin typed, otherwise the saved job
  const v = state?.values ?? {
    title: job.title,
    company: job.company,
    location: job.location,
    type: job.type,
    salary: job.salary,
    tags: job.tags.join(", "),
    description: job.description,
    requirements: job.requirements.join("\n"),
  };
  const e = state?.errors;

  return (
    <form
      key={JSON.stringify(v)}
      action={formAction}
      className="mt-8 brutal-border p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="JOB TITLE"
          name="title"
          defaultValue={v.title}
          error={e?.title?.[0]}
        />
        <Input
          label="COMPANY"
          name="company"
          defaultValue={v.company}
          error={e?.company?.[0]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Input
          label="LOCATION"
          name="location"
          defaultValue={v.location}
          error={e?.location?.[0]}
        />
        <BrutalSelect
          label="TYPE"
          name="type"
          defaultValue={v.type}
          error={e?.type?.[0]}
          options={[
            { value: "FULL-TIME", label: "FULL-TIME" },
            { value: "PART-TIME", label: "PART-TIME" },
            { value: "CONTRACT", label: "CONTRACT" },
            { value: "INTERNSHIP", label: "INTERNSHIP" },
          ]}
        />
        <Input
          label="SALARY RANGE"
          name="salary"
          defaultValue={v.salary}
          error={e?.salary?.[0]}
        />
      </div>

      <Input
        label="TAGS (COMMA SEPARATED)"
        name="tags"
        defaultValue={v.tags}
        error={e?.tags?.[0]}
      />

      <TextArea
        label="DESCRIPTION"
        name="description"
        rows={6}
        defaultValue={v.description}
        error={e?.description?.[0]}
      />

      <TextArea
        label="REQUIREMENTS (ONE PER LINE)"
        name="requirements"
        defaultValue={v.requirements}
        error={e?.requirements?.[0]}
      />

      {e?.form && (
        <p className="font-mono text-sm text-destructive">{e.form[0]}</p>
      )}
      {e?.id && <p className="font-mono text-sm text-destructive">{e.id[0]}</p>}

      <div className="flex pt-4 border-t-3 border-foreground">
        <Button type="submit" variant="accent" disabled={isPending}>
          {isPending ? "SAVING..." : "SAVE CHANGES"}
        </Button>
        <Link
          href="/dashboard/jobs"
          className={buttonVariants({
            variant: "outline",
            className: "border-l-0",
          })}>
          CANCEL
        </Link>
      </div>
    </form>
  );
}

export default EditJobForm;
