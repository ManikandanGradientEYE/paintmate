import { prisma } from "@/lib/prisma";
import { toColourRoom } from "@/lib/mappers";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import HomeHero from "@/components/home/HomeHero";
import BeforeAfter from "@/components/home/BeforeAfter";
import AboutSection from "@/components/home/AboutSection";
import WhyUs from "@/components/home/WhyUs";
import OurWork from "@/components/home/OurWork";
import ColourExperience from "@/components/home/ColourExperience";
import Journey from "@/components/home/Journey";
import Reviews from "@/components/home/Reviews";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const roomRows = await prisma.colourRoom.findMany({
    orderBy: { sortOrder: "asc" },
    include: { previews: true },
  });

  return (
    <>
      <SiteHeader />
      <main className="overflow-x-hidden">
        <HomeHero />
        <BeforeAfter />
        <AboutSection />
        <WhyUs />
        <OurWork />
        <ColourExperience rooms={roomRows.map(toColourRoom)} />
        <Journey />
        <Reviews />
      </main>
      <SiteFooter />
    </>
  );
}
