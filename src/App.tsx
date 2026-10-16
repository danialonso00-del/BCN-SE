import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Connection from './components/Connection';
import Expertise from './components/Expertise';
import Applications from './components/Applications';
import Approach from './components/Approach';
import Statement from './components/Statement';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useReveal } from './hooks/useReveal';
import { useParallax } from './hooks/useParallax';

export default function App() {
  useReveal();
  useParallax();

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Connection />
        <Expertise />
        <Applications />
        <Approach />
        <Statement />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
