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
    time: "11:00",
    dateTime: "2026-09-25T11:00:00+09:00",
    displayDate: "2026. 09. 25",
    day: "FRIDAY",
    displayTime: "11:00 AM",
    venue: "매료테이블",
    venueEnglish: "MAERYO TABLE",
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
    "/images/gallery/01.webp",
    "/images/gallery/02.webp",
    "/images/gallery/03.webp",
    "/images/gallery/04.webp",
    "/images/gallery/05.webp",
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
    description: "2026. 09. 25 FRI 11:00 · 매료테이블",
    image: "/images/share.webp",
  },
} as const;

export type Invitation = typeof invitation;
