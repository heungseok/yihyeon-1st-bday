import { invitation } from "@/config/invitation";
import { assetPath } from "@/lib/paths";

export function Hero() {
  return (
    <header className="hero" aria-labelledby="hero-title">
      <div className="heroMedia">
        <img
          src={assetPath(invitation.hero.image)}
          alt={`${invitation.baby.name}의 첫돌 초대 사진`}
          className="heroImage"
          style={{ objectPosition: invitation.hero.imagePosition }}
          width={1600}
          height={2200}
          fetchPriority="high"
        />
        <div className="heroGradient" aria-hidden="true" />
      </div>

      <div className="heroCopy" data-reveal>
        <p className="eyebrow">{invitation.message.eyebrow}</p>
        <h1 id="hero-title">이현이의 첫 번째 생일</h1>
        <span className="fineRule" aria-hidden="true" />
        <p className="heroDate">{invitation.event.displayDate}</p>
        <p className="heroMeta">
          {invitation.event.day} <span aria-hidden="true">·</span>{" "}
          {invitation.event.displayTime}
        </p>
        <p className="heroVenue">{invitation.event.venueEnglish}</p>
      </div>
    </header>
  );
}
