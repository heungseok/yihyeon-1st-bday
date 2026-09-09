"use client";

import { useEffect, useState } from "react";
import { invitation, type Invitation } from "@/config/invitation";
import { getDDay } from "@/lib/date";

export function DDay({ data = invitation }: { data?: Invitation }) {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setDays(getDDay(data.event.date)), 0);
    return () => window.clearTimeout(timer);
  }, [data.event.date]);

  if (days === null || days < 0) return null;

  return (
    <p className="dDay" aria-live="polite">
      {days === 0 ? "TODAY" : `D - ${days}`}
    </p>
  );
}
