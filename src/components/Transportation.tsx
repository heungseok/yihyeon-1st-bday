import { invitation } from "@/config/invitation";

export function Transportation() {
  const { parking, note } = invitation.transportation;
  if (!parking && !note) return null;

  return (
    <div className="transportation" data-reveal>
      {parking && (
        <div>
          <p className="eyebrow">PARKING</p>
          <p>{parking}</p>
        </div>
      )}
      {note && <p className="transportationNote">{note}</p>}
    </div>
  );
}
