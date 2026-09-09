import { invitation, type Invitation } from "@/config/invitation";
import { AddToCalendar } from "@/components/AddToCalendar";
import { DDay } from "@/components/DDay";

export function EventDate({ data = invitation }: { data?: Invitation }) {
  const [year, month, day] = data.event.date.split("-");
  const monthNumber = Number(month);
  const dayNumber = Number(day);

  return (
    <section className="section dateSection" aria-labelledby="date-title">
      <div data-reveal>
        <p className="eyebrow">THE DAY</p>
        <h2 id="date-title" className="srOnly">행사 날짜</h2>
        <div className="editorialDate">
          <p className="dateYear">{year}</p>
          <p className="dateNumber">{monthNumber}월 {dayNumber}일</p>
        </div>
        <div className="dateDetails">
          <p>{data.event.day}</p>
          <span aria-hidden="true" />
          <p>{data.event.displayTime}</p>
        </div>
        <DDay data={data} />
        <AddToCalendar data={data} />
      </div>
    </section>
  );
}
