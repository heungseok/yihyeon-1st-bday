# 박이현 첫돌 모바일 초대장

사진과 여백을 중심으로 만든 한 페이지형 모바일 초대장입니다. Next.js App Router와 TypeScript로 작성되었고, 별도 서버 없이 GitHub Pages에 정적 배포됩니다.

자주 수정하는 곳은 아래 두 곳뿐입니다.

- 행사 정보와 문구: `src/config/invitation.ts`
- 사진: `public/images/`

현재 포함된 사진은 화면 확인을 위한 AI 생성 임시 이미지입니다. 실제 이현이와 가족사진으로 교체해 사용하세요. QR 기능과 자동 재생 음악은 포함하지 않았습니다.

## 1. 처음 실행하기

Node.js 22 이상과 npm이 필요합니다.

```bash
npm install
cp .env.example .env.local
npm run dev
```

브라우저에서 `http://localhost:3000`을 엽니다.

배포 전에는 반드시 아래 두 명령을 모두 실행합니다.

```bash
npm run lint
npm run build
```

빌드 결과는 `out/`에 생성됩니다.

## 2. 이현이 이름과 부모 이름 변경

`src/config/invitation.ts`에서 아래 값만 바꿉니다.

```ts
baby: {
  name: "박이현",
  englishName: "yihyeon",
},
parents: {
  father: "박흥석",
  mother: "김수린",
},
```

영문 이름은 현재 요청에 따라 `yihyeon`으로 설정되어 있습니다.

## 3. 행사 날짜 변경

날짜와 시간은 같은 파일의 `event`에서 수정합니다.

```ts
event: {
  date: "2026-09-25",
  time: "11:00",
  dateTime: "2026-09-25T11:00:00+09:00",
  displayDate: "2026. 09. 25",
  day: "FRIDAY",
  displayTime: "11:00 AM",
}
```

- `date`: D-day 계산용입니다. `YYYY-MM-DD` 형식을 유지합니다.
- `dateTime`: Google Calendar와 `.ics` 파일용입니다. 한국 시간대 `+09:00`을 유지합니다.
- `displayDate`, `day`, `displayTime`: 화면과 공유 문구에 보이는 값입니다.

D-day는 한국 날짜를 기준으로 자동 계산됩니다. 행사 당일에는 `TODAY`, 행사 후에는 D-day 문구가 표시되지 않습니다.

## 4. 행사 장소 변경

```ts
event: {
  venue: "매료테이블",
  venueEnglish: "MAERYO TABLE",
  address: "경상남도 창원시 마산합포구 덕동길 31",
  naverMapUrl: "https://naver.me/xs3GX19W",
  coordinates: null,
}
```

기본값 `coordinates: null`에서는 Kakao 지도 주소 검색으로 좌표를 찾습니다. 주소 검색이 정확하지 않을 때만 아래처럼 좌표를 직접 입력합니다.

```ts
coordinates: {
  latitude: 35.000000,
  longitude: 128.000000,
},
```

주차나 교통 안내는 아래 값에 입력합니다. 값이 비어 있으면 해당 영역은 렌더링되지 않습니다.

```ts
transportation: {
  parking: "매료테이블 전용 주차장을 이용해 주세요.",
  note: "주차 공간이 제한될 수 있습니다.",
},
```

## 5. 티저 사진 변경

새 사진을 WebP 형식으로 준비한 뒤 기존 파일을 같은 이름으로 덮어씁니다.

```text
public/images/hero.webp
```

권장 조건:

- 세로 사진
- 가로 1600px 이상
- 인물 얼굴이 사진 가장자리에 붙지 않은 사진
- WebP 품질 80~88 정도

사진 초점 위치는 설정 파일에서 조정합니다.

```ts
hero: {
  image: "/images/hero.webp",
  imagePosition: "50% 38%",
},
```

첫 번째 값은 가로, 두 번째 값은 세로 위치입니다. 얼굴이 너무 위에 있으면 `50% 30%`, 너무 아래에 있으면 `50% 45%`처럼 조정합니다.

## 6. 갤러리 사진 변경

아래 파일을 같은 이름으로 교체합니다.

```text
public/images/gallery/01.webp
public/images/gallery/02.webp
public/images/gallery/03.webp
public/images/gallery/04.webp
public/images/gallery/05.webp
```

세로와 가로 사진을 함께 사용할 수 있습니다. 긴 변 기준 1600~2000px 정도의 WebP를 권장합니다. 파일명은 영문과 숫자만 사용하면 배포 오류를 줄일 수 있습니다.

## 7. 사진 순서 변경

`src/config/invitation.ts`의 배열 순서가 화면 순서입니다.

```ts
gallery: [
  "/images/gallery/03.webp",
  "/images/gallery/01.webp",
  "/images/gallery/02.webp",
],
```

### 갤러리 사진 추가와 삭제

사진을 추가할 때:

1. `public/images/gallery/06.webp`처럼 새 파일을 넣습니다.
2. `gallery` 배열에 `"/images/gallery/06.webp"`를 추가합니다.
3. `npm run build`로 파일명 오류가 없는지 확인합니다.

사진을 삭제할 때는 배열에서 해당 줄을 먼저 삭제하고, 더 이상 쓰지 않는 이미지 파일을 제거합니다.

## 8. 초대 문구 변경

`message.lines`의 한 항목이 한 줄입니다. 빈 문자열 `""`은 문단 사이 여백입니다.

```ts
message: {
  eyebrow: "OUR FIRST BIRTHDAY",
  lines: [
    "첫 번째 문장",
    "두 번째 문장",
    "",
    "새 문단의 문장",
  ],
},
```

한 줄이 너무 길면 작은 화면에서 자연스럽게 줄바꿈됩니다. 문장을 짧게 유지하면 현재의 절제된 레이아웃을 보존하기 좋습니다.

## 9. Kakao API 설정

1. [Kakao Developers](https://developers.kakao.com/)에서 애플리케이션을 만듭니다.
2. 앱 키에서 **JavaScript 키**를 복사합니다.
3. 프로젝트 루트에 `.env.local`을 만들고 아래처럼 입력합니다.

```text
NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY=발급받은_JavaScript_키
```

4. JavaScript SDK 도메인에 아래 도메인을 등록합니다.

```text
http://localhost:3000
https://USERNAME.github.io
```

프로젝트 사이트 경로(`/REPOSITORY/`)는 도메인 뒤에 붙지만, Kakao 콘솔에는 일반적으로 origin인 `https://USERNAME.github.io`를 등록합니다. Custom domain을 사용하면 그 도메인도 추가합니다.

키가 없거나 지도 로딩이 실패해도 장소 정보와 네이버·카카오 지도 버튼은 그대로 사용할 수 있습니다. 실제 키는 커밋하지 마세요.

## 10. 카카오톡 공유 설정

현재 공식 Kakao JavaScript SDK의 `Kakao.Share.sendDefault()`를 사용합니다. Kakao Developers에서 다음 항목을 확인합니다.

1. JavaScript SDK 도메인에 배포 도메인이 등록되어 있는지 확인합니다.
2. 제품 링크 또는 웹 도메인 설정에 실제 초대장 주소를 등록합니다.
3. `public/images/share.webp`가 배포 후 공개 URL로 열리는지 확인합니다.
4. GitHub 저장소의 **Settings → Secrets and variables → Actions**에서 repository secret을 만듭니다.

```text
Name: NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY
Value: 발급받은 JavaScript 키
```

공유 대표 이미지는 `public/images/share.webp`를 같은 이름으로 교체합니다. 권장 크기는 `1200 × 630px`입니다. Kakao SDK가 준비되지 않으면 Web Share API, 그마저 없으면 링크 복사 순서로 자동 전환됩니다.

## 11. GitHub repository 생성

권장 저장소 이름은 영문 이름 표기에 맞춘 `yihyeon-first-birthday`입니다.

```bash
git init
git add .
git commit -m "Create Yihyeon's first birthday invitation"
git branch -M main
git remote add origin https://github.com/USERNAME/yihyeon-first-birthday.git
git push -u origin main
```

이미 Git 저장소로 시작한 경우 `git init`은 생략합니다. 커밋 전에는 반드시 `npm run lint`와 `npm run build`를 실행합니다.

## 12. GitHub Pages 배포

`.github/workflows/deploy.yml`이 `main` 브랜치 push 시 아래 순서로 자동 배포합니다.

```text
checkout → Node 설정 → npm ci → npm run build → out 업로드 → Pages 배포
```

GitHub 저장소에서:

1. **Settings → Pages**로 이동합니다.
2. **Build and deployment → Source**를 **GitHub Actions**로 선택합니다.
3. **Actions** 탭에서 `Deploy to GitHub Pages` 실행이 성공했는지 확인합니다.
4. `https://USERNAME.github.io/REPOSITORY/`를 엽니다.

`next.config.ts`는 GitHub Actions에서 저장소 이름을 읽어 `basePath`와 `assetPrefix`를 자동 설정하므로 프로젝트 하위 경로에서도 이미지와 스크립트가 깨지지 않습니다.

## 13. Custom domain 연결

1. DNS 제공업체에서 서브도메인은 `USERNAME.github.io`를 향하는 CNAME으로 설정합니다. 루트 도메인은 [GitHub 공식 Custom domain 문서](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)를 따라 설정합니다.
2. GitHub **Settings → Pages → Custom domain**에 사용할 도메인을 입력합니다.
3. DNS 확인 후 **Enforce HTTPS**를 켭니다.
4. Kakao Developers의 JavaScript SDK 도메인과 제품 링크 웹 도메인에 Custom domain을 추가합니다.
5. GitHub **Settings → Secrets and variables → Actions → Variables**에 아래 repository variable을 추가하면 OG와 카카오 공유 URL도 Custom domain을 사용합니다.

```text
Name: NEXT_PUBLIC_SITE_URL
Value: https://invite.example.com
```

## 사진 교체 체크리스트

- `hero.webp`가 세로 사진인지 확인
- `share.webp`가 1200 × 630px인지 확인
- 갤러리 파일명과 설정 배열이 정확히 일치하는지 확인
- `npm run build` 후 `out/images/`에 새 사진이 복사되었는지 확인
- 배포 후 브라우저 캐시 때문에 예전 사진이 보이면 새로고침 또는 파일명 변경 후 config 수정

## 일정 변경 체크리스트

- `date`, `time`, `dateTime`을 함께 변경
- 화면 표기인 `displayDate`, `day`, `displayTime`도 변경
- `share.description`의 날짜와 시간 변경
- Google Calendar 링크와 `.ics` 다운로드 확인
- D-day 숫자 확인

## 배포 전 최종 확인

```bash
npm run lint
npm run build
```

그 다음 375px, 390px, 430px, 480px 모바일 폭과 1440px 데스크톱에서 확인합니다.

- Hero 사진과 하단 gradient
- 갤러리 swipe, 이전·다음, 번호, lightbox, ESC 닫기
- D-day와 Calendar 저장
- Kakao 지도 로딩 실패 시 fallback
- 네이버 지도와 카카오맵 링크
- 주소·초대장 링크 복사 toast
- Kakao Talk 공유와 fallback
- Open Graph 이미지 주소
- GitHub Pages 하위 경로에서 새로고침

## 검색 노출과 개인정보

페이지 metadata에는 `noindex, nofollow`가 적용되어 있고 sitemap은 만들지 않습니다.

**noindex는 검색 노출을 줄이는 설정일 뿐 접근 제어 또는 보안 기능은 아닙니다.** 초대장 URL을 아는 사람은 누구나 열 수 있으므로, 공개를 원하지 않는 개인 정보는 넣지 마세요.

## 참고한 공식 문서

- [Kakao Talk Share JavaScript](https://developers.kakao.com/docs/ko/kakaotalk-share/js-link)
- [Kakao JavaScript SDK 다운로드](https://developers.kakao.com/docs/ko/javascript/download)
- [Kakao 지도 주소로 장소 표시](https://apis.map.kakao.com/web/sample/addr2coord/)
- [GitHub Pages Custom workflow](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
