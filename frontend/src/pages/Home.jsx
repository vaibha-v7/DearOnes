import Header from '../components/Home/Header';
import Hero from '../components/Home/Hero';
import HowItWorks from '../components/Home/HowItWorks';
import FeaturedTemplates from '../components/Home/FeaturedTemplates';
import Newsletter from '../components/Home/Newsletter';
import Footer from '../components/Home/Footer';
import FAB from '../components/Home/FAB';

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-12">
        <Hero />
        <HowItWorks />
        <FeaturedTemplates />
        <Newsletter />
      </main>
      <Footer />
      <FAB />
    </>
  );
}
