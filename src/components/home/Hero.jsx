import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import hero1 from "../../assets/hero1.jpg";
import hero2 from "../../assets/hero2.jpg";
import hero3 from "../../assets/hero3.jpg";
import hero4 from "../../assets/hero4.jpg";
import { Link } from "react-router";

const images = [hero1, hero2, hero3, hero4];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [cachedImages, setCachedImages] = useState([]);

  // Cache images in localStorage
  useEffect(() => {
    const preloadImages = () => {
      images.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    };

    preloadImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, []);

  // Use cached images if available, otherwise use original images
  const displayImages =
    cachedImages.length === images.length ? cachedImages : images;

  return (
    <div className="h-[calc(100vh-30vh)] relative overflow-hidden">
      <motion.div
        className="flex w-full h-full"
        animate={{ x: `-${currentIndex * 100}%` }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        {displayImages.map((image, index) => (
          <div key={index} className="w-full h-full shrink-0 relative">
            <img
              src={image}
              alt={`Hero ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 bg-opacity-40"></div>
          </div>
        ))}
      </motion.div>

      {/* Fixed centered text */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="text-center px-4">
          <motion.h1
            className="text-white text-5xl md:text-7xl font-bold mb-4 poppins-black"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Welcome to PipeCraft
          </motion.h1>
          <motion.p
            className="text-white text-xl md:text-2xl font-semibold poppins"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Innovative Solutions for Modern Challenges
          </motion.p>

          {/* CTA button */}
          <div className="flex flex-row item-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {}}
              className="mt-6 inline-block bg-white text-black px-6 py-3 rounded-full font-semibold shadow-lg"
              aria-label="Get started with PipeCraft"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <Link to="/aboutus">About us</Link>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const el = document.getElementById("contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
                else window.location.href = "#contact";
              }}
              className="mt-6 inline-block bg-transparent text-white border border-white px-6 py-3 rounded-full font-semibold shadow-lg"
              aria-label="Get started with PipeCraft"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <Link to="/contactus">Get in touch</Link>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Navigation dots */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
      >
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-white w-8" : "bg-gray-400"
            }`}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Hero;
