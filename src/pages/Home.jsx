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
