import { Hero } from "@/components/Hero";
import { InvitationMessage } from "@/components/InvitationMessage";
import { Gallery } from "@/components/Gallery";
import { EventDate } from "@/components/EventDate";
import { Location } from "@/components/Location";
import { Share } from "@/components/Share";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export default function HomePage() {
  return (
    <>
      <Reveal />
      <main className="invitationShell">
        <Hero />
        <InvitationMessage />
        <Gallery />
        <EventDate />
        <Location />
        <Share />
        <Footer />
      </main>
    </>
  );
}
