import BannerSection from "@/components/home/bannerSection";
import GamesContainer from "@/components/home/gamesContainer";
import PlayCardsContainer from "@/components/home/playcardsContainer";
import SubscriptionsContainer from "@/components/home/subscriptionsSection";
import VouchersContainer from "@/components/home/vouchersContainer";
import darkBackground from "@/assets/dark-background.jpg";

export default function Home() {
  return (
    <main style={{ backgroundImage: `url(${darkBackground.src})`}} className="min-h-screen w-full bg-gray-900 bg-cover bg-center bg-fixed pb-40">
      <div className="container mx-auto pt-20 px-5 lg:px-0">
        <BannerSection />
        <GamesContainer />
        <PlayCardsContainer />
        <SubscriptionsContainer />
        <VouchersContainer />
      </div>
    </main>
  );
}
