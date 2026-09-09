import { invitation, type Invitation } from "@/config/invitation";

export function Footer({ data = invitation }: { data?: Invitation }) {
  return (
    <footer className="footer">
      <p className="footerName">{data.baby.englishName}</p>
      <p>{data.event.displayDate}</p>
      <span className="fineRule" aria-hidden="true" />
      <p className="footerThanks">WITH LOVE, OUR FAMILY</p>
    </footer>
  );
}
