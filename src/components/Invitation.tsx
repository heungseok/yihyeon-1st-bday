import { EventDate } from "@/components/EventDate";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { InitialLoader } from "@/components/InitialLoader";
import { InvitationMessage } from "@/components/InvitationMessage";
import { Location } from "@/components/Location";
import { Reveal } from "@/components/Reveal";
import { Share } from "@/components/Share";

type InvitationProps = {
  heroImage?: string;
  heroImagePosition?: string;
};

export function Invitation({ heroImage, heroImagePosition }: InvitationProps = {}) {
  return (
    <>
      <InitialLoader />
      <Reveal />
      <main className="invitationShell">
        <Hero image={heroImage} imagePosition={heroImagePosition} />
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
