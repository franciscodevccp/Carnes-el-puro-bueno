import { Categories } from "@/components/home/Categories";
import { FeaturedCuts } from "@/components/home/FeaturedCuts";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Reviews } from "@/components/home/Reviews";
import { TrustSeals } from "@/components/home/TrustSeals";
import { WaysToBuy } from "@/components/home/WaysToBuy";
import { WeeklyPromos } from "@/components/home/WeeklyPromos";
import { WholesaleBlock } from "@/components/home/WholesaleBlock";
import { Reveal } from "@/components/motion";

export default function Home() {
  return (
    <>
      <Hero />
      <Reveal>
        <WaysToBuy />
      </Reveal>
      <Reveal>
        <FeaturedCuts />
      </Reveal>
      <Reveal>
        <WeeklyPromos />
      </Reveal>
      <Reveal>
        <Categories />
      </Reveal>
      <Reveal>
        <WholesaleBlock />
      </Reveal>
      <Reveal>
        <HowItWorks />
      </Reveal>
      <Reveal>
        <TrustSeals />
      </Reveal>
      <Reveal>
        <Reviews />
      </Reveal>
    </>
  );
}
