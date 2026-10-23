/** @format */

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import * as React from "react";

export const StatusBadge = ({ status }: { status: string }) => {
  const variantMap: Record<
    string,
    "submitted" | "review" | "shortlist" | "interview" | "rejected"
  > = {
    SUBMITTED: "submitted",
    REVIEW: "review",
    SHORTLIST: "shortlist",
    INTERVIEW: "interview",
    REJECTED: "rejected",
  };

  return <Badge variant={variantMap[status] || "submitted"}>{status}</Badge>;
};

export const AiScore = ({
  score,
  size = "md",
}: {
  score: number;
  size?: "sm" | "md" | "lg";
}) => {
  const color =
    score >= 8
      ? "text-accent"
      : score >= 6
        ? "text-warning"
        : "text-destructive";
  const sizeClasses = {
    sm: "text-lg",
    md: "text-3xl",
    lg: "text-5xl",
  };
  return (
    <div className="font-mono font-bold">
      <span className={`${color} ${sizeClasses[size]}`}>
        {score.toFixed(1)}
      </span>
      <span className="text-muted-foreground text-xs">/10</span>
    </div>
  );
};

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
