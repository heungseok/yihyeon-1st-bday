"use client";

import { useEffect, useState } from "react";
import { invitation, type Invitation } from "@/config/invitation";
import { copyText } from "@/lib/share";
import { openKakaoMap } from "@/lib/maps";
import { KakaoMap } from "@/components/KakaoMap";
import { Toast } from "@/components/Toast";
import { Transportation } from "@/components/Transportation";

export function Location({ data = invitation }: { data?: Invitation }) {
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const copyAddress = async () => {
    try {
      await copyText(data.event.address);
      setToast("주소가 복사되었습니다.");
    } catch {
      setToast("주소를 복사하지 못했습니다.");
    }
  };

  return (
    <section className="section locationSection" aria-labelledby="location-title">
      <div className="locationCopy" data-reveal>
        <p className="eyebrow">LOCATION</p>
        <h2 id="location-title">{data.event.venue}</h2>
        <p className="venueEnglish">{data.event.venueEnglish}</p>
        <p className="venueMessage">{data.event.venueMessage}</p>
        <address>{data.event.address}</address>
        <button type="button" className="underlinedButton" onClick={copyAddress}>주소 복사</button>
      </div>

      <div data-reveal>
        <KakaoMap data={data} />
        <div className="mapLinks" aria-label="지도에서 길찾기">
          <a href={data.event.naverMapUrl} target="_blank" rel="noreferrer">네이버 지도</a>
          {data.event.kakaoMapUrl ? (
            <a href={data.event.kakaoMapUrl} target="_blank" rel="noreferrer">카카오맵</a>
          ) : (
            <button type="button" onClick={() => openKakaoMap(data.event.venue, data.event.address)}>카카오맵</button>
          )}
        </div>
      </div>

      <Transportation />
      <Toast message={toast} />
    </section>
  );
}
