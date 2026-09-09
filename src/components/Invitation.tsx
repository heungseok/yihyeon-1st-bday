import { EventDate } from "@/components/EventDate";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { InitialLoader } from "@/components/InitialLoader";
import { InvitationMessage } from "@/components/InvitationMessage";
import { Location } from "@/components/Location";
import { Reveal } from "@/components/Reveal";
import { Share } from "@/components/Share";
import { invitation, type Invitation as InvitationData } from "@/config/invitation";

type InvitationProps = {
  data?: InvitationData;
  heroImage?: string;
  heroImagePosition?: string;
};

export function Invitation({ data = invitation, heroImage, heroImagePosition }: InvitationProps = {}) {
  return (
    <>
      <InitialLoader />
      <Reveal />
      <main className="invitationShell">
        <Hero data={data} image={heroImage} imagePosition={heroImagePosition} />
        <InvitationMessage />
        <Gallery />
        <EventDate data={data} />
        <Location data={data} />
        <Share data={data} />
        <Footer data={data} />
      </main>
    </>
  );
}
