"use client";

import { useCallback, useState } from "react";
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";
import { invitation } from "@/config/invitation";

type MapStatus = "loading" | "ready" | "unavailable";

function MapFallback({ status }: { status: Exclude<MapStatus, "ready"> }) {
  return (
    <div className="mapFallback" role="status">
      <span className="mapMarker" aria-hidden="true" />
      <span className="mapFallbackCopy">
        <strong>{invitation.event.venue}</strong>
        <small>
          {status === "loading"
            ? "카카오맵을 불러오는 중"
            : "카카오맵을 불러올 수 없습니다"}
        </small>
      </span>
    </div>
  );
}

function KakaoMapView({ appKey }: { appKey: string }) {
  const [ready, setReady] = useState(false);
  const [, error] = useKakaoLoader({
    appkey: appKey,
    id: "kakao-map-sdk",
    url: "https://dapi.kakao.com/v2/maps/sdk.js",
  });
  const { latitude, longitude } = invitation.event.coordinates;
  const position = { lat: latitude, lng: longitude };
  const status: MapStatus = error ? "unavailable" : ready ? "ready" : "loading";
  const handleCreate = useCallback(() => setReady(true), []);

  return (
    <div className={`mapFrame map-${status}`}>
      <Map
        center={position}
        level={4}
        className="mapCanvas"
        aria-label={`${invitation.event.venue} 카카오맵`}
        onCreate={handleCreate}
      >
        <MapMarker position={position} title={invitation.event.venue} />
      </Map>
      {status !== "ready" && <MapFallback status={status} />}
    </div>
  );
}

export function KakaoMap() {
  const appKey = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;

  if (!appKey) {
    return (
      <div className="mapFrame map-unavailable">
        <MapFallback status="unavailable" />
      </div>
    );
  }

  return <KakaoMapView appKey={appKey} />;
}
