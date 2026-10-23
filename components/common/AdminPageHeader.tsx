/** @format */

import Link from "next/link";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";

type Props = {
  title: string;
  subtitle?: string;
  actionButtonLink?: string;
  actionButtonText?: string;
  actionButtonVariant?: VariantProps<typeof buttonVariants>["variant"];
};

function AdminPageHeader({
  title,
  subtitle,
  actionButtonLink,
  actionButtonText,
  actionButtonVariant = "default",
}: Props) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-4xl">{title}</h1>
        {subtitle && (
          <p className="font-mono text-sm text-muted-foreground mt-1">
            {subtitle}
          </p>
        )}
      </div>

      {actionButtonLink && actionButtonText && (
        <Link
          href={actionButtonLink}
          className={buttonVariants({ variant: actionButtonVariant })}>
          {actionButtonText}
        </Link>
      )}
    </div>
  );
}

export default AdminPageHeader;
