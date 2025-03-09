import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { Navbar } from "@/components/navbar";
import { WalletConnect } from "@/components/wallet-connect";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <WalletConnect />
      <Footer />
    </main>
  );
}