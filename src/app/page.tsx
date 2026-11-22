import BlogInsights from "@/components/BlogInsights";
import ContactSection from "@/components/ContactSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import KineticBanner from "@/components/KineticBanner";
import LogoMarquee from "@/components/LogoMarquee";
import ServicesShowcase from "@/components/ServicesShowcase";

export default function Home() {
  return (
    <main
      id="top"
      className="mx-auto max-w-[1440px] px-2.5 pt-2.5 sm:px-4 sm:pt-3.5 md:px-6"
    >
      <HeroSection />
      <LogoMarquee />
      <ServicesShowcase />
      <FaqSection />
      <BlogInsights />
      <KineticBanner />
      <ContactSection />
      <Footer />
    </main>
  );
}
