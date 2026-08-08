"use client";

import { useEffect, useState } from "react";

const SDK_ID = "kakao-javascript-sdk";

export const useKakao = () => {
  const [ready, setReady] = useState(false);
  const key = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;

  useEffect(() => {
    if (!key) return;

    const initialize = () => {
      if (!window.Kakao) return;
      if (!window.Kakao.isInitialized()) window.Kakao.init(key);
      setReady(window.Kakao.isInitialized());
    };

    const existing = document.getElementById(SDK_ID) as HTMLScriptElement | null;
    if (existing) {
      if (window.Kakao) initialize();
      else existing.addEventListener("load", initialize, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = SDK_ID;
    script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.8.1/kakao.min.js";
    script.crossOrigin = "anonymous";
    script.addEventListener("load", initialize, { once: true });
    document.head.appendChild(script);

    return () => script.removeEventListener("load", initialize);
  }, [key]);

  return { ready, key };
};
