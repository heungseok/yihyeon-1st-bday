export const getKakaoMapWebUrl = (venue: string, address: string) =>
  `https://map.kakao.com/link/search/${encodeURIComponent(`${venue} ${address}`)}`;

export const getOpenStreetMapEmbedUrl = (latitude: number, longitude: number) => {
  const latitudePadding = 0.0028;
  const longitudePadding = 0.0042;
  const boundingBox = [
    longitude - longitudePadding,
    latitude - latitudePadding,
    longitude + longitudePadding,
    latitude + latitudePadding,
  ]
    .map((coordinate) => coordinate.toFixed(7))
    .join(",");

  const params = new URLSearchParams({
    bbox: boundingBox,
    layer: "mapnik",
    marker: `${latitude},${longitude}`,
  });

  return `https://www.openstreetmap.org/export/embed.html?${params.toString()}`;
};

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
