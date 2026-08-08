export const getKakaoMapWebUrl = (venue: string, address: string) =>
  `https://map.kakao.com/link/search/${encodeURIComponent(`${venue} ${address}`)}`;

export const openKakaoMap = (venue: string, address: string) => {
  const query = encodeURIComponent(`${venue} ${address}`);
  const webUrl = getKakaoMapWebUrl(venue, address);
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (!isMobile) {
    window.open(webUrl, "_blank", "noopener,noreferrer");
    return;
  }

  const startedAt = Date.now();
  window.location.href = `kakaomap://search?q=${query}`;
  window.setTimeout(() => {
    if (document.visibilityState === "visible" && Date.now() - startedAt < 2200) {
      window.location.href = webUrl;
    }
  }, 1200);
};
