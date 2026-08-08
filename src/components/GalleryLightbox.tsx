"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { invitation } from "@/config/invitation";
import { assetPath } from "@/lib/paths";

type GalleryLightboxProps = {
  open: boolean;
  initialIndex: number;
  onClose: () => void;
};

export function GalleryLightbox({ open, initialIndex, onClose }: GalleryLightboxProps) {
  const [viewportRef, emblaApi] = useEmblaCarousel({ loop: true, startIndex: initialIndex });
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi || !open) return;
    emblaApi.scrollTo(initialIndex, true);
  }, [emblaApi, initialIndex, onSelect, open]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") emblaApi?.scrollPrev();
      if (event.key === "ArrowRight") emblaApi?.scrollNext();

      if (event.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>("button:not([disabled]), [href], [tabindex]:not([tabindex='-1'])"),
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus();
    };
  }, [emblaApi, onClose, open]);

  if (!open) return null;

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="사진 크게 보기"
      ref={dialogRef}
    >
      <button className="lightboxBackdrop" aria-label="사진 크게 보기 닫기" onClick={onClose} />
      <div className="lightboxTop">
        <span aria-live="polite">
          {String(selectedIndex + 1).padStart(2, "0")} / {String(invitation.gallery.length).padStart(2, "0")}
        </span>
        <button ref={closeButtonRef} type="button" className="iconButton lightboxClose" onClick={onClose} aria-label="닫기">
          <span aria-hidden="true">×</span>
        </button>
      </div>

      <div className="lightboxViewport" ref={viewportRef}>
        <div className="lightboxContainer">
          {invitation.gallery.map((image, index) => (
            <div className="lightboxSlide" key={image}>
              <img
                src={assetPath(image)}
                alt={`${invitation.baby.name}의 소중한 순간 ${index + 1}`}
                width={1600}
                height={2000}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="lightboxControls" aria-label="사진 이동">
        <button type="button" className="iconButton" onClick={() => emblaApi?.scrollPrev()} aria-label="이전 사진">←</button>
        <button type="button" className="iconButton" onClick={() => emblaApi?.scrollNext()} aria-label="다음 사진">→</button>
      </div>
    </div>
  );
}
