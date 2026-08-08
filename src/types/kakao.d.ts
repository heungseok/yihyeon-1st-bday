type KakaoSharePayload = {
  objectType: "feed";
  content: {
    title: string;
    description: string;
    imageUrl: string;
    link: { mobileWebUrl: string; webUrl: string };
  };
  buttons: Array<{
    title: string;
    link: { mobileWebUrl: string; webUrl: string };
  }>;
};

type KakaoMapResult = { x: string; y: string };

declare global {
  interface Window {
    Kakao?: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Share: { sendDefault: (payload: KakaoSharePayload) => void };
    };
    kakao?: {
      maps: {
        load: (callback: () => void) => void;
        LatLng: new (latitude: number, longitude: number) => unknown;
        Map: new (container: HTMLElement, options: { center: unknown; level: number }) => {
          setCenter: (center: unknown) => void;
        };
        Marker: new (options: { map: unknown; position: unknown }) => unknown;
        services: {
          Status: { OK: string };
          Geocoder: new () => {
            addressSearch: (
              address: string,
              callback: (result: KakaoMapResult[], status: string) => void,
            ) => void;
          };
        };
      };
    };
  }
}

export {};
