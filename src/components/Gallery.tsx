"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { invitation } from "@/config/invitation";
import { assetPath } from "@/lib/paths";
import { GalleryLightbox } from "@/components/GalleryLightbox";

export function Gallery() {
  const [viewportRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center", duration: 28 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  return (
    <section className="section gallerySection" aria-labelledby="gallery-title">
      <div className="sectionHeading" data-reveal>
        <p className="eyebrow">OUR MOMENTS</p>
        <h2 id="gallery-title">이현이의 소중한 순간들</h2>
      </div>

      <div className="gallery" data-reveal>
        <div className="galleryViewport" ref={viewportRef}>
          <div className="galleryContainer">
            {invitation.gallery.map((image, index) => (
              <div className="gallerySlide" key={image}>
                <button
                  type="button"
                  className="galleryImageButton"
                  onClick={() => setLightboxIndex(index)}
                  aria-label={`${index + 1}번째 사진 크게 보기`}
                >
                  <img
                    src={assetPath(image)}
                    alt={`${invitation.baby.name}의 소중한 순간 ${index + 1}`}
                    width={1600}
                    height={2000}
                    loading="lazy"
                    draggable={false}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="galleryMeta">
          <button className="textArrow" type="button" onClick={() => emblaApi?.scrollPrev()} aria-label="이전 사진">←</button>
          <div className="galleryProgress" aria-hidden="true">
            {invitation.gallery.map((image, index) => (
              <span
                className={index === selectedIndex ? "isActive" : ""}
                key={image}
              />
            ))}
          </div>
          <span className="galleryCount" aria-live="polite">
            {String(selectedIndex + 1).padStart(2, "0")} / {String(invitation.gallery.length).padStart(2, "0")}
          </span>
          <button className="textArrow" type="button" onClick={() => emblaApi?.scrollNext()} aria-label="다음 사진">→</button>
        </div>
      </div>

      {lightboxIndex !== null && (
        <GalleryLightbox
          key={lightboxIndex}
          open
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  );
}
