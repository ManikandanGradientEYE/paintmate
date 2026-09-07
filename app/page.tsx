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

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-hidden">
        <HomeHero />
        <BeforeAfter />
        <AboutSection />
        <WhyUs />
        <OurWork />
        <ColourExperience />
        <Journey />
        <Reviews />
      </main>
      <SiteFooter />
    </>
  );
}
