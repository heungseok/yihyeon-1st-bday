import { invitation, type Invitation } from "@/config/invitation";
import { assetPath } from "@/lib/paths";

type HeroProps = {
  data?: Invitation;
  image?: string;
  imagePosition?: string;
};

export function Hero({
  data = invitation,
  image = data.hero.image,
  imagePosition = data.hero.imagePosition,
}: HeroProps = {}) {
  return (
    <header className="hero" aria-labelledby="hero-title">
      <div className="heroMedia">
        <img
          src={assetPath(image)}
          alt={`${data.baby.name}의 첫돌 초대 사진`}
          className="heroImage"
          style={{ objectPosition: imagePosition }}
          width={1600}
          height={2200}
          fetchPriority="high"
        />
        <div className="heroGradient" aria-hidden="true" />
      </div>

      <div className="heroCopy" data-reveal>
        <p className="eyebrow">{data.message.eyebrow}</p>
        <h1 id="hero-title">이현이의 첫 번째 생일</h1>
        <span className="fineRule" aria-hidden="true" />
        <p className="heroDate">{data.event.displayDate}</p>
        <p className="heroMeta">
          {data.event.day} <span aria-hidden="true">·</span>{" "}
          {data.event.displayTime}
        </p>
        <p className="heroVenue">{data.event.venueEnglish}</p>
      </div>
    </header>
  );
}
