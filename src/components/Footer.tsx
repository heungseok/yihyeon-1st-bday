import { invitation } from "@/config/invitation";

export function Footer() {
  return (
    <footer className="footer">
      <p className="footerName">{invitation.baby.englishName}</p>
      <p>{invitation.event.displayDate}</p>
      <span className="fineRule" aria-hidden="true" />
      <p className="footerThanks">WITH LOVE, OUR FAMILY</p>
    </footer>
  );
}
