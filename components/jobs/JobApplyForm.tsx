/** @format */

import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

function JobApplyForm({ jobId }: { jobId: string }) {
  return (
    <form className="brutal-border lg:border-l-0 p-8">
      <h3 className="font-heading text-xl font-bold mb-6 border-b-3 border-foreground pb-4">
        APPLY NOW
      </h3>

      <div className="space-y-4">
        <input type="hidden" name="jobId" value={jobId} />

        <Input name="candidateName" label="FULL NAME" placeholder="YOUR NAME" />
        <Input
          name="candidateEmail"
          type="email"
          label="EMAIL"
          placeholder="YOUR@EMAIL.COM"
        />
        <Input
          name="candidateLinkedin"
          type="url"
          label="LINKEDIN"
          placeholder="https://linkedin.com/in/..."
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
          label="COVER NOTE"
          placeholder="WHY THIS ROLE?"
        />

        <Button type="button" variant="accent" className="w-full mt-4" disabled>
          SUBMIT APPLICATION →
        </Button>
      </div>
    </form>
  );
}

export default JobApplyForm;
