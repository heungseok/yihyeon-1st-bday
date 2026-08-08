"use client";

import { useEffect, useRef, useState } from "react";
import { invitation } from "@/config/invitation";
import { getOpenStreetMapEmbedUrl } from "@/lib/maps";

const SCRIPT_ID = "kakao-map-sdk";

export function KakaoMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "unavailable">("loading");
  const key = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;
  const { latitude, longitude } = invitation.event.coordinates;
  const previewUrl = getOpenStreetMapEmbedUrl(latitude, longitude);

  useEffect(() => {
    if (!key || !mapRef.current) {
      setStatus("unavailable");
      return;
    }

    let active = true;

    const drawMap = () => {
      window.kakao?.maps.load(() => {
        if (!active || !mapRef.current || !window.kakao) return;
        const maps = window.kakao.maps;
        const fallbackCenter = new maps.LatLng(latitude, longitude);
        const map = new maps.Map(mapRef.current, { center: fallbackCenter, level: 4 });

        const showMarker = (latitude: number, longitude: number) => {
          const position = new maps.LatLng(latitude, longitude);
          new maps.Marker({ map, position });
          map.setCenter(position);
          setStatus("ready");
        };

        showMarker(latitude, longitude);
      });
    };

    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      if (window.kakao) drawMap();
      else existing.addEventListener("load", drawMap, { once: true });
      return () => { active = false; };
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&autoload=false&libraries=services`;
    script.addEventListener("load", drawMap, { once: true });
    script.addEventListener("error", () => setStatus("unavailable"), { once: true });
    document.head.appendChild(script);

    return () => {
      active = false;
      script.removeEventListener("load", drawMap);
    };
  }, [key, latitude, longitude]);

  return (
    <div className={`mapFrame map-${status}`}>
      <iframe
        className="mapPreview"
        src={previewUrl}
        title={`${invitation.event.venue} 지도 미리보기`}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
      <div ref={mapRef} className="mapCanvas" aria-label={`${invitation.event.venue} 지도`} />
      {status !== "ready" && (
        <div className="mapFallback" role="status">
          <span className="mapMarker" aria-hidden="true" />
          <span className="mapFallbackCopy">
            <strong>{invitation.event.venue}</strong>
            <small>{status === "loading" ? "지도를 불러오는 중" : "지도 미리보기"}</small>
          </span>
        </div>
      )}
    </div>
  );
}
