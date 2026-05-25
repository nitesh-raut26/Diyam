import SEO from '../components/SEO'
import Hero from '../components/Hero'
import Products from '../components/Products'
import Categories from '../components/Categories'
import WhyDiyam from '../components/WhyDiyam'
import About from '../components/About'
import Gallery from '../components/Gallery'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <SEO 
        title="Premium LED Focus Lights, Spotlights & Spiritual Lighting"
        description="DIYAM is India's premium brand for luxury LED lights, heavy-duty waterproof Focus Lights, spots, downlights, linear systems, and high-purity drivers. Illuminate your home, commercial project, or spiritual space with premium aesthetics."
        keywords="diyam lighting, focus light, led focus light, premium spotlight, architectural lighting, diyam, outdoor focus light, waterproof lighting, industrial led"
        path="/"
      />
      <Hero />
      <Products limit={8} />
      <Categories />
      <WhyDiyam />
      <About />
      <Gallery limit={6} />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  )
}
