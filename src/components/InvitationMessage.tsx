import { invitation } from "@/config/invitation";

export function InvitationMessage() {
  return (
    <section className="section invitationMessage" aria-labelledby="invitation-title">
      <div data-reveal>
        <p className="eyebrow">INVITATION</p>
        <h2 id="invitation-title" className="srOnly">초대의 글</h2>
        <div className="messageLines">
          {invitation.message.lines.map((line, index) =>
            line ? (
              <p key={`${line}-${index}`}>{line}</p>
            ) : (
              <span className="messageBreak" aria-hidden="true" key={`break-${index}`} />
            ),
          )}
        </div>
        <p className="parents">
          {invitation.parents.father} <span aria-hidden="true">·</span>{" "}
          {invitation.parents.mother}
        </p>
      </div>
    </section>
  );
}
