"use client";

import { useEffect, useState } from "react";
import { invitation } from "@/config/invitation";
import { useKakao } from "@/hooks/useKakao";
import { copyText, getAbsoluteAssetUrl, getCurrentUrl, shareWithWebApi } from "@/lib/share";
import { Toast } from "@/components/Toast";

export function Share() {
  const { ready } = useKakao();
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const handleKakaoShare = async () => {
    const url = getCurrentUrl();
    if (ready && window.Kakao) {
      try {
        window.Kakao.Share.sendDefault({
          objectType: "feed",
          content: {
            title: invitation.share.title,
            description: `2026. 09. 25 FRI\n11:00 AM\n\n${invitation.event.venue}`,
            imageUrl: getAbsoluteAssetUrl(invitation.share.image),
            link: { mobileWebUrl: url, webUrl: url },
          },
          buttons: [
            { title: "초대장 보기", link: { mobileWebUrl: url, webUrl: url } },
          ],
        });
        return;
      } catch {
        // 공식 SDK를 사용할 수 없으면 운영체제 공유로 이어집니다.
      }
    }

    try {
      const result = await shareWithWebApi(invitation);
      if (result === "copied") setToast("초대장 링크가 복사되었습니다.");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setToast("공유하지 못했습니다. 링크 복사를 이용해 주세요.");
    }
  };

  const handleCopy = async () => {
    try {
      await copyText(getCurrentUrl());
      setToast("초대장 링크가 복사되었습니다.");
    } catch {
      setToast("링크를 복사하지 못했습니다.");
    }
  };

  return (
    <section className="section shareSection" aria-labelledby="share-title">
      <div data-reveal>
        <p className="eyebrow">SHARE OUR DAY</p>
        <h2 id="share-title">
          이현이의 첫 생일 소식을<br />
          소중한 분들과 함께 나눠주세요.
        </h2>
        <div className="shareActions">
          <button type="button" onClick={handleKakaoShare}>카카오톡으로 공유</button>
          <button type="button" onClick={handleCopy}>링크 복사</button>
        </div>
      </div>
      <Toast message={toast} />
    </section>
  );
}
