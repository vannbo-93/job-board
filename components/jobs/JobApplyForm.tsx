/** @format */

"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  handleApplyToJob,
  type ApplyToJobState,
} from "@/app/actions/applications/applications.action";

type Props = {
  jobId: string;
  defaultName?: string;
  defaultEmail?: string;
};

function JobApplyForm({ jobId, defaultName = "", defaultEmail = "" }: Props) {
  const [state, formAction, isPending] = useActionState<
    ApplyToJobState,
    FormData
  >(handleApplyToJob, undefined);

  if (state?.success) {
    return (
      <div className="brutal-border lg:border-l-0 p-8">
        <h3 className="font-heading text-xl font-bold mb-4">
          APPLICATION SENT ✓
        </h3>
        <p className="font-mono text-sm text-muted-foreground">
          WE&apos;LL REVIEW YOUR APPLICATION AND GET BACK TO YOU BY EMAIL.
        </p>
      </div>
    );
  }

  // After a failed submit use what was typed, otherwise the logged-in user's details
  const v = state?.values;
  const e = state?.errors;

  return (
    <form
      key={JSON.stringify(v ?? {})}
      action={formAction}
      className="brutal-border lg:border-l-0 p-8">
      <h3 className="font-heading text-xl font-bold mb-6 border-b-3 border-foreground pb-4">
        APPLY NOW
      </h3>

      <div className="space-y-4">
        <input type="hidden" name="jobId" value={jobId} />

        <Input
          name="candidateName"
          label="FULL NAME"
          placeholder="YOUR NAME"
          autoComplete="name"
          required
          defaultValue={v?.candidateName ?? defaultName}
          error={e?.candidateName?.[0]}
        />
        <Input
          name="candidateEmail"
          type="email"
          label="EMAIL"
          placeholder="YOUR@EMAIL.COM"
          autoComplete="email"
          required
          defaultValue={v?.candidateEmail ?? defaultEmail}
          error={e?.candidateEmail?.[0]}
        />
        <Input
          name="candidateLinkedin"
          type="url"
          label="LINKEDIN (OPTIONAL)"
          placeholder="https://linkedin.com/in/..."
          defaultValue={v?.candidateLinkedin}
          error={e?.candidateLinkedin?.[0]}
        />

        <div>
          <p className="font-heading text-xs font-bold uppercase mb-2">
            RESUME
          </p>
          <div className="brutal-border border-dashed p-8 text-center opacity-60">
            <p className="font-mono text-sm font-bold">COMING SOON</p>
          </div>
        </div>

        <TextArea
          name="candidateCoverLetter"
          label="COVER NOTE (OPTIONAL)"
          placeholder="WHY THIS ROLE?"
          maxLength={2000}
          className="break-words"
          defaultValue={v?.candidateCoverLetter}
          error={e?.candidateCoverLetter?.[0]}
        />

        {(e?.auth || e?.form || e?.jobId) && (
          <p className="font-mono text-sm text-destructive">
            {e.auth?.[0] ?? e.form?.[0] ?? e.jobId?.[0]}
          </p>
        )}

        <Button
          type="submit"
          variant="accent"
          className="w-full mt-4"
          disabled={isPending}>
          {isPending ? "SUBMITTING..." : "SUBMIT APPLICATION →"}
        </Button>
      </div>
    </form>
  );
}

export default JobApplyForm;
