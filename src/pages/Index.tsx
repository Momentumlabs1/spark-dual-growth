import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import TeamSection from "@/components/TeamSection";
import ServicesGrid from "@/components/ServicesGrid";
import BMICalculator from "@/components/BMICalculator";
import TestimonialSection from "@/components/TestimonialSection";
import BookingFunnel from "@/components/BookingFunnel";
import Footer from "@/components/Footer";
import HealthCalculatorCTA from "@/components/HealthCalculatorCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-nf-white">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section with Video Embed */}
      <HeroSection />

      {/* Services Section */}
      <ServicesGrid />

      {/* BMI Calculator */}
      <BMICalculator />

      {/* Health Calculator CTA */}
      <HealthCalculatorCTA />

      {/* Team Section */}
      <TeamSection />

      {/* Testimonials & Social Proof */}
      <TestimonialSection />

      {/* Booking Funnel */}

      {/* Footer */}
      <Footer />
    </div>
  );
};
export default Index;
