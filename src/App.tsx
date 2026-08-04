import { lazy, Suspense } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Rooms from "./components/Rooms";

const Amenities = lazy(() => import("./components/Amenities"));
const BeanCrazy = lazy(() => import("./components/BeanCrazy"));
const Explore = lazy(() => import("./components/Explore"));
const Location = lazy(() => import("./components/Location"));
const Reviews = lazy(() => import("./components/Reviews"));
const FAQ = lazy(() => import("./components/FAQ"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

const Placeholder = () => <div className="h-64 w-full bg-sand-50" aria-hidden />;

export default function App() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Rooms />
        <Suspense fallback={<Placeholder />}>
          <Amenities />
          <BeanCrazy />
          <Explore />
          <Location />
          <Reviews />
          <FAQ />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={<Placeholder />}>
        <Footer />
      </Suspense>
    </>
  );
}
