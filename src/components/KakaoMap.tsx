"use client";

import { useCallback, useState } from "react";
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";
import { invitation, type Invitation } from "@/config/invitation";

type MapStatus = "loading" | "ready" | "unavailable";

function MapFallback({ status, data = invitation }: { status: Exclude<MapStatus, "ready">; data?: Invitation }) {
  return (
    <div className="mapFallback" role="status">
      <span className="mapMarker" aria-hidden="true" />
      <span className="mapFallbackCopy">
        <strong>{data.event.venue}</strong>
        <small>
          {status === "loading"
            ? "카카오맵을 불러오는 중"
            : data.event.kakaoMapUrl
              ? "지도 버튼을 눌러 위치 보기"
            : "카카오맵을 불러올 수 없습니다"}
        </small>
      </span>
    </div>
  );
}

function KakaoMapView({ appKey, data, coordinates }: {
  appKey: string;
  data: Invitation;
  coordinates: NonNullable<Invitation["event"]["coordinates"]>;
}) {
  const [ready, setReady] = useState(false);
  const [, error] = useKakaoLoader({
    appkey: appKey,
    id: "kakao-map-sdk",
    url: "https://dapi.kakao.com/v2/maps/sdk.js",
  });
  const { latitude, longitude } = coordinates;
  const position = { lat: latitude, lng: longitude };
  const status: MapStatus = error ? "unavailable" : ready ? "ready" : "loading";
  const handleCreate = useCallback(() => setReady(true), []);

  return (
    <div className={`mapFrame map-${status}`}>
      <Map
        center={position}
        level={4}
        className="mapCanvas"
        aria-label={`${data.event.venue} 카카오맵`}
        onCreate={handleCreate}
      >
        <MapMarker position={position} title={data.event.venue} />
      </Map>
      {status !== "ready" && <MapFallback status={status} data={data} />}
    </div>
  );
}

export function KakaoMap({ data = invitation }: { data?: Invitation }) {
  const appKey = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;

  if (!appKey || !data.event.coordinates) {
    return (
      <div className="mapFrame map-unavailable">
        <MapFallback status="unavailable" data={data} />
      </div>
    );
  }

  return <KakaoMapView appKey={appKey} data={data} coordinates={data.event.coordinates} />;
}
