/** @format */

"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/textarea";
import { BrutalSelect } from "@/components/BrutalUI";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  handleCreateJob,
  type CreateJobState,
} from "@/app/actions/jobs/jobs.action";

function CreateJobForm() {
  const [state, formAction, isPending] = useActionState<
    CreateJobState,
    FormData
  >(handleCreateJob, undefined);

  const v = state?.values;
  const e = state?.errors;

  return (
    // key forces the inputs to remount with the returned values after each submit
    <form
      key={JSON.stringify(v ?? {})}
      action={formAction}
      className="mt-8 brutal-border p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="JOB TITLE"
          name="title"
          placeholder="e.g. SENIOR FRONTEND ENGINEER"
          defaultValue={v?.title}
          error={e?.title?.[0]}
        />
        <Input
          label="COMPANY"
          name="company"
          placeholder="e.g. NEXUS LABS"
          defaultValue={v?.company}
          error={e?.company?.[0]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Input
          label="LOCATION"
          name="location"
          placeholder="e.g. REMOTE"
          defaultValue={v?.location}
          error={e?.location?.[0]}
        />
        <BrutalSelect
          label="TYPE"
          name="type"
          defaultValue={v?.type ?? ""}
          error={e?.type?.[0]}
          options={[
            { value: "", label: "SELECT TYPE" },
            { value: "FULL-TIME", label: "FULL-TIME" },
            { value: "PART-TIME", label: "PART-TIME" },
            { value: "CONTRACT", label: "CONTRACT" },
            { value: "INTERNSHIP", label: "INTERNSHIP" },
          ]}
        />
        <Input
          label="SALARY RANGE"
          name="salary"
          placeholder="e.g. $140K–$180K"
          defaultValue={v?.salary}
          error={e?.salary?.[0]}
        />
      </div>

      <Input
        label="TAGS (COMMA SEPARATED)"
        name="tags"
        placeholder="e.g. REACT, TYPESCRIPT, WEBGL"
        defaultValue={v?.tags}
        error={e?.tags?.[0]}
      />

      <TextArea
        label="DESCRIPTION"
        name="description"
        placeholder="Describe the role, responsibilities, and what makes it exciting..."
        defaultValue={v?.description}
        error={e?.description?.[0]}
      />

      <TextArea
        label="REQUIREMENTS (ONE PER LINE)"
        name="requirements"
        placeholder={"5+ years React\nTypeScript expert\nSystem design skills"}
        defaultValue={v?.requirements}
        error={e?.requirements?.[0]}
      />

      {e?.form && (
        <p className="font-mono text-sm text-destructive">{e.form[0]}</p>
      )}

      <div className="flex pt-4 border-t-3 border-foreground">
        <Button type="submit" variant="accent" disabled={isPending}>
          {isPending ? "PUBLISHING..." : "PUBLISH JOB"}
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

export default CreateJobForm;
