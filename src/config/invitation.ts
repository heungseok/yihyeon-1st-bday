export const invitation = {
  baby: {
    name: "박이현",
    englishName: "yihyeon",
  },

  parents: {
    father: "박흥석",
    mother: "김수린",
  },

  event: {
    date: "2026-09-25",
    time: "12:00",
    dateTime: "2026-09-25T12:00:00+09:00",
    displayDate: "2026. 09. 25",
    day: "FRIDAY",
    displayTime: "12:00 PM",
    venue: "매료테이블",
    venueEnglish: "MAERYO TABLE",
    venueMessage:
      "이현이의 첫 생일에 찾아오신 분들이 편안하게 식사하고 여유로운 시간을 보내실 수 있도록, 작지만 아늑하고 예쁜 공간을 준비했습니다.",
    address: "경상남도 창원시 마산합포구 덕동길 31",
    naverMapUrl: "https://naver.me/xs3GX19W",
    coordinates: {
      latitude: 35.1409511,
      longitude: 128.5797972,
    },
  },

  hero: {
    image: "/images/hero.webp",
    imagePosition: "50% 38%",
  },

  gallery: [
    // 원본 촬영 시각이 오래된 순서입니다.
    // 촬영 시각이 없는 사진은 성장 단계와 인접 촬영 내용을 기준으로 배치했습니다.
    "/images/gallery/12.webp",
    "/images/gallery/09.webp",
    "/images/gallery/42.webp",
    "/images/gallery/44.webp",
    "/images/gallery/47.webp",
    "/images/gallery/08.webp",
    "/images/gallery/10.webp",
    "/images/gallery/11.webp",
    "/images/gallery/48.webp",
    "/images/gallery/50.webp",
    "/images/gallery/16.webp",
    "/images/gallery/51.webp",
    "/images/gallery/17.webp",
    "/images/gallery/52.webp",
    "/images/gallery/23.webp",
    "/images/gallery/24.webp",
    "/images/gallery/25.webp",
    "/images/gallery/53.webp",
    "/images/gallery/54.webp",
    "/images/gallery/55.webp",
    "/images/gallery/27.webp",
    "/images/gallery/28.webp",
    "/images/gallery/29.webp",
    "/images/gallery/06.webp",
    "/images/gallery/56.webp",
    "/images/gallery/60.webp",
    "/images/gallery/61.webp",
    "/images/gallery/62.webp",
    "/images/gallery/63.webp",
    "/images/gallery/64.webp",
    "/images/gallery/66.webp",
    "/images/gallery/67.webp",
    "/images/gallery/68.webp",
    "/images/gallery/69.webp",
    "/images/gallery/70.webp",
    "/images/gallery/71.webp",
    "/images/gallery/72.webp",
    "/images/gallery/46.webp",
    "/images/gallery/73.webp",
    "/images/gallery/75.webp",
    "/images/gallery/49.webp",
    "/images/gallery/57.webp",
    "/images/gallery/58.webp",
    "/images/gallery/65.webp",
    "/images/gallery/13.webp",
    "/images/gallery/14.webp",
    "/images/gallery/15.webp",
    "/images/gallery/74.webp",
    "/images/gallery/76.webp",
    "/images/gallery/07.webp",
    "/images/gallery/19.webp",
    "/images/gallery/20.webp",
    "/images/gallery/22.webp",
    "/images/gallery/30.webp",
    "/images/gallery/18.webp",
    "/images/gallery/21.webp",
    "/images/gallery/31.webp",
    "/images/gallery/32.webp",
    "/images/gallery/33.webp",
    "/images/gallery/34.webp",
    "/images/gallery/26.webp",
    "/images/gallery/35.webp",
    "/images/gallery/36.webp",
    "/images/gallery/37.webp",
    "/images/gallery/38.webp",
    "/images/gallery/39.webp",
    "/images/gallery/40.webp",
    "/images/gallery/41.webp",
    "/images/gallery/45.webp",
  ],

  message: {
    eyebrow: "OUR FIRST BIRTHDAY",
    lines: [
      "어느덧 이현이가 세상에 온 지 한 해가 되었습니다.",
      "작은 웃음과 몸짓으로 매일을 특별하게 만들어 준",
      "이현이의 첫 번째 생일을",
      "소중한 분들과 함께 나누고 싶습니다.",
      "",
      "바쁘시더라도 함께하시어",
      "이현이의 첫 번째 생일을",
      "따뜻하게 축복해 주세요.",
    ],
  },

  transportation: {
    parking: "",
    note: "",
  },

  share: {
    title: "이현이의 첫 번째 생일에 초대합니다",
    description: "2026. 09. 25 FRI 12:00 · 매료테이블",
    image: "/images/share.webp?v=20260809",
  },
} as const;

export type Invitation = Omit<typeof invitation, "event" | "share"> & {
  event: {
    date: string;
    time: string;
    dateTime: string;
    displayDate: string;
    day: string;
    displayTime: string;
    venue: string;
    venueEnglish: string;
    venueMessage: string;
    address: string;
    naverMapUrl: string;
    kakaoMapUrl?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  share: {
    title: string;
    description: string;
    image: string;
  };
};

export const seoulInvitation: Invitation = {
  ...invitation,
  event: {
    ...invitation.event,
    date: "2026-09-19",
    time: "17:30",
    dateTime: "2026-09-19T17:30:00+09:00",
    displayDate: "2026. 09. 19",
    day: "SATURDAY",
    displayTime: "5:30 PM",
    venue: "풀셋",
    venueEnglish: "FULLSET",
    address: "서울 서대문구 거북골로 12-15 2층",
    naverMapUrl: "https://naver.me/xpBiSO4F",
    kakaoMapUrl: "https://kko.to/tpOXU1AKh3",
    coordinates: {
      latitude: 37.5857348,
      longitude: 126.9184791,
    },
  },
  share: {
    ...invitation.share,
    description: "2026. 09. 19 SAT 5:30 PM · 풀셋",
  },
};
