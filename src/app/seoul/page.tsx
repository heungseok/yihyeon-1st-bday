import { Invitation } from "@/components/Invitation";
import { seoulInvitation } from "@/config/invitation";

export default function SeoulPage() {
  return <Invitation data={seoulInvitation} heroImage="/images/family-hero.jpg" heroImagePosition="50% 50%" />;
}
