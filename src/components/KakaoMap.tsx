"use client";

import { useEffect, useRef, useState } from "react";
import { invitation } from "@/config/invitation";

const SCRIPT_ID = "kakao-map-sdk";

export function KakaoMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "unavailable">("loading");
  const key = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;

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
        const fallbackCenter = new maps.LatLng(35.1746, 128.5658);
        const map = new maps.Map(mapRef.current, { center: fallbackCenter, level: 4 });

        const showMarker = (latitude: number, longitude: number) => {
          const position = new maps.LatLng(latitude, longitude);
          new maps.Marker({ map, position });
          map.setCenter(position);
          setStatus("ready");
        };

        if (invitation.event.coordinates) {
          showMarker(invitation.event.coordinates.latitude, invitation.event.coordinates.longitude);
          return;
        }

        const geocoder = new maps.services.Geocoder();
        geocoder.addressSearch(invitation.event.address, (result, geocoderStatus) => {
          if (!active) return;
          if (geocoderStatus === maps.services.Status.OK && result[0]) {
            showMarker(Number(result[0].y), Number(result[0].x));
          } else {
            setStatus("unavailable");
          }
        });
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
  }, [key]);

  return (
    <div className={`mapFrame map-${status}`}>
      <div ref={mapRef} className="mapCanvas" aria-label={`${invitation.event.venue} 지도`} />
      {status !== "ready" && (
        <div className="mapFallback" role="status">
          <span className="mapMarker" aria-hidden="true" />
          <p>{status === "loading" ? "지도를 불러오는 중입니다." : "지도를 불러올 수 없습니다."}</p>
          {status === "unavailable" && <small>아래 지도 버튼으로 위치를 확인해 주세요.</small>}
        </div>
      )}
    </div>
  );
}
