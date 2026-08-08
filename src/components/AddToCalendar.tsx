"use client";

import { useEffect, useRef, useState } from "react";
import { invitation } from "@/config/invitation";
import { createGoogleCalendarUrl, downloadIcs } from "@/lib/calendar";

export function AddToCalendar() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button type="button" className="quietButton" onClick={() => setOpen(true)}>
        캘린더에 저장
      </button>
      {open && (
        <div className="sheetLayer" role="presentation">
          <button className="sheetBackdrop" aria-label="캘린더 선택 닫기" onClick={() => setOpen(false)} />
          <div className="bottomSheet" role="dialog" aria-modal="true" aria-labelledby="calendar-title" ref={dialogRef}>
            <span className="sheetHandle" aria-hidden="true" />
            <p className="eyebrow" id="calendar-title">ADD TO CALENDAR</p>
            <a
              className="sheetAction"
              href={createGoogleCalendarUrl(invitation)}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
            >
              Google Calendar
            </a>
            <button
              className="sheetAction"
              type="button"
              onClick={() => {
                downloadIcs(invitation);
                setOpen(false);
              }}
            >
              캘린더 파일 저장
            </button>
            <button className="sheetCancel" type="button" onClick={() => setOpen(false)}>닫기</button>
          </div>
        </div>
      )}
    </>
  );
}
