import HeroSection from "@/components/home/HeroSection";
import StatsBar from "@/components/home/StatsBar";
import NewWrapper from "@/components/content/NewWrapper";
import OutterWrapper from "@/components/content/OutterWrapper";
import SportEvent from "@/components/content/SportEvent";
import LastWrapper from "@/components/content/LastWrapper";

/**
 * Homepage
 * --------
 * Composes the redesigned sections in reading order. The `.home`
 * wrapper scopes the new design's box-sizing reset (see site.css).
 * Hero + Stats are static; News / Video / Activities / Partners are
 * CMS-driven (data logic untouched in their components).
 */
export default function Home({ params }: { params: { locale: string } }) {
  return (
    <main id="content" className="home">
      <HeroSection />
      <StatsBar />
      <NewWrapper params={params} />
      <OutterWrapper params={params} />
      <SportEvent />
      <LastWrapper />
    </main>
  );
}
