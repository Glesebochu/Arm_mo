import NavBar from "../components/Custom/NavBar";
import Hero from "../components/Custom/Hero";
import Developers from "../components/Custom/Developers";
import Features from "../components/Custom/Features";
import Testimonial from "../components/Custom/Testimonial";
import ContactUs from "../components/Custom/ContactUs";
import Footer from "@/components/Custom/Footer";

const Landing = () => {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
      <NavBar />
      <Hero />
      <Developers />
      <Features/>
      <Testimonial/>
      <ContactUs/>
      <Footer/>
    </div>
  );
};

export default Landing;
