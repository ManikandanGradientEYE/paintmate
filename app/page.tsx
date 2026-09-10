import { prisma } from "@/lib/prisma";
import { toColourRoom, toReview, toSocialLink } from "@/lib/mappers";
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
  const [roomRows, reviewRows, socialRows] = await Promise.all([
    prisma.colourRoom.findMany({
      orderBy: { sortOrder: "asc" },
      include: { swatches: true },
    }),
    prisma.review.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.socialLink.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  return (
    <>
      <SiteHeader />
      {/* clip, not hidden: overflow-hidden here would break the pinned panel in Journey */}
      <main className="overflow-x-clip">
        <HomeHero />
        <BeforeAfter />
        <AboutSection />
        <WhyUs />
        <OurWork />
        <ColourExperience rooms={roomRows.map(toColourRoom)} />
        <Journey />
        <Reviews reviews={reviewRows.map(toReview)} />
      </main>
      <SiteFooter socials={socialRows.map(toSocialLink)} />
    </>
  );
}
