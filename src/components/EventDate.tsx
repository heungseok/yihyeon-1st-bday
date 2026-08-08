import { invitation } from "@/config/invitation";
import { AddToCalendar } from "@/components/AddToCalendar";
import { DDay } from "@/components/DDay";

export function EventDate() {
  const [year, month, day] = invitation.event.date.split("-");
  const monthName = new Intl.DateTimeFormat("en-US", { month: "long", timeZone: "Asia/Seoul" })
    .format(new Date(`${year}-${month}-${day}T00:00:00+09:00`))
    .toUpperCase();

  return (
    <section className="section dateSection" aria-labelledby="date-title">
      <div data-reveal>
        <p className="eyebrow">THE DAY</p>
        <h2 id="date-title" className="srOnly">행사 날짜</h2>
        <div className="editorialDate">
          <p className="dateMonth">{monthName}</p>
          <p className="dateNumber">{day}</p>
          <p className="dateYear">{year}</p>
        </div>
        <div className="dateDetails">
          <p>{invitation.event.day}</p>
          <span aria-hidden="true" />
          <p>{invitation.event.displayTime}</p>
        </div>
        <DDay />
        <AddToCalendar />
      </div>
    </section>
  );
}
