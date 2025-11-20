import Hero from "@/components/home/Hero";
import OurServices from "@/components/home/OurServices";
import WhyChooseUs from "@/components/home/WhyChooseUs";

const Home = () => {
  return (
    <div className="poppins bg-gray-600">
      <Hero />
      <WhyChooseUs />
      <OurServices />
    </div>
  );
};

export default Home;
