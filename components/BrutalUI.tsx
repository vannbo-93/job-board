/** @format */

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import * as React from "react";

export const MetricBox = ({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub?: string;
}) => (
  <div className="brutal-border brutal-shadow p-6 bg-card">
    <p className="font-mono text-xs text-muted-foreground uppercase">{label}</p>
    <p className="font-heading text-4xl font-bold mt-2">{value}</p>
    {sub && (
      <p className="font-mono text-xs text-muted-foreground mt-1">{sub}</p>
    )}
  </div>
);

type Option = { value: string; label: string };

export interface BrutalSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Option[];
}

export function BrutalSelect({
  label,
  error,
  options,
  className,
  id,
  name,
  ...props
}: BrutalSelectProps) {
  const selectId = id ?? name ?? label?.toLowerCase().replace(/\s+/g, "-");
  const errorId = error && selectId ? `${selectId}-error` : undefined;

  return (
    <div>
      {label && (
        <label
          htmlFor={selectId}
          className="font-heading text-xs font-bold uppercase block mb-2">
          {label}
        </label>
      )}
      <select
        id={selectId}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        className={cn(
          "w-full brutal-border bg-background px-4 py-3 font-mono text-sm uppercase",
          "focus:outline-none focus:bg-accent/10 cursor-pointer",
          error && "border-destructive",
          className,
        )}
        {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={errorId} className="font-mono text-xs text-destructive mt-1">
          {error}
        </p>
      )}
    </div>
  );
}

import type { ApplicationStatus } from "@/types";

export function AiScore({
  score,
  size = "md",
}: {
  score: number;
  size?: "sm" | "md";
}) {
  const sizeClass = size === "sm" ? "text-sm" : "text-2xl";

  if (score <= 0) {
    return (
      <span
        className={cn("font-mono font-bold text-muted-foreground", sizeClass)}>
        —
      </span>
    );
  }

  const color =
    score >= 8
      ? "text-accent"
      : score >= 6.5
        ? "text-foreground"
        : "text-destructive";

  return (
    <span className={cn("font-mono font-bold", sizeClass, color)}>
      {score.toFixed(1)}
    </span>
  );
}

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <span
      className={cn(
        "inline-block w-fit font-mono text-[10px] font-bold px-2 py-0.5 brutal-border-thin",
        `status-${status.toLowerCase()}`,
      )}>
      {status}
    </span>
  );
}
