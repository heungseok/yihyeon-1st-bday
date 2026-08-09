"use client";

import { useEffect, useState } from "react";

const MINIMUM_DISPLAY_MS = 1200;
const MAXIMUM_WAIT_MS = 3500;
const EXIT_DURATION_MS = 700;

export function InitialLoader() {
  const [isLeaving, setIsLeaving] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const startedAt = performance.now();
    const previousOverflow = document.body.style.overflow;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let exitTimer: ReturnType<typeof setTimeout> | undefined;
    let isCancelled = false;

    document.body.style.overflow = "hidden";

    const heroImage = document.querySelector<HTMLImageElement>(".heroImage");
    const heroReady = new Promise<void>((resolve) => {
      if (!heroImage || heroImage.complete) {
        resolve();
        return;
      }

      heroImage.addEventListener("load", () => resolve(), { once: true });
      heroImage.addEventListener("error", () => resolve(), { once: true });
    });

    const maximumWait = new Promise<void>((resolve) => {
      window.setTimeout(resolve, MAXIMUM_WAIT_MS);
    });

    void Promise.race([heroReady, maximumWait]).then(() => {
      const minimumDisplay = prefersReducedMotion ? 150 : MINIMUM_DISPLAY_MS;
      const remaining = Math.max(0, minimumDisplay - (performance.now() - startedAt));

      window.setTimeout(() => {
        if (isCancelled) return;

        setIsLeaving(true);
        document.body.style.overflow = previousOverflow;

        exitTimer = setTimeout(
          () => setIsVisible(false),
          prefersReducedMotion ? 0 : EXIT_DURATION_MS,
        );
      }, remaining);
    });

    return () => {
      isCancelled = true;
      if (exitTimer) clearTimeout(exitTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="initialLoader"
      data-leaving={isLeaving}
      role="status"
      aria-live="polite"
      aria-label="초대장을 준비하고 있습니다"
    >
      <div className="initialLoaderInner">
        <div className="initialLoaderTitle">
          <svg
            className="initialLoaderLeaf"
            viewBox="0 0 34 34"
            aria-hidden="true"
          >
            <path className="leafStem" d="M9 27c5-7 10-12 18-18" />
            <path className="leafFill leafOne" d="M15 19C8 20 6 16 7 11c6-1 10 2 8 8Z" />
            <path className="leafFill leafTwo" d="M20 14c0-7 4-10 9-10 1 6-2 10-9 10Z" />
            <path className="leafFill leafThree" d="M21 20c6-2 10 1 11 5-5 3-10 1-11-5Z" />
          </svg>

          <p className="initialLoaderName">이현</p>

          <svg
            className="initialLoaderSongpyeon"
            viewBox="0 0 40 34"
            aria-hidden="true"
          >
            <path className="songpyeonBody" d="M5 24C7 13 12 7 20 7s13 6 15 17c-8 4-22 4-30 0Z" />
            <path className="songpyeonLine" d="M11 22c5 2 13 2 18 0M20 8c-3 5-4 10-3 15" />
          </svg>
        </div>
        <span className="initialLoaderRule" aria-hidden="true" />
        <p className="initialLoaderCaption">FIRST BIRTHDAY</p>
      </div>
    </div>
  );
}
