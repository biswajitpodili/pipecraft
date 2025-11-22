import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router";
import useServicesContext from "@/context/useServicesContext";

const OurServices = () => {
  const { services } = useServicesContext();

  return (
    <div className="py-20 px-4 md:px-8 lg:px-16 bg-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl poppins-light text-white tracking-tight mb-6">
            Our Services
          </h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive engineering solutions tailored to meet your project
            requirements with expertise across multiple disciplines
          </p>
        </div>

        {/* Services Stack */}
        <div className="relative">
          {services?.map((service, index) => {
            return (
              <motion.div
                key={index}
                style={{
                  top: `${(index + 2) * 50}px`,
                  position: "sticky",
                }}
                className="mb-8"
              >
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`p-8 md:p-12 rounded-2xl shadow-2xl backdrop-blur-sm border border-gray-700 ${
                    index % 2 === 0
                      ? "bg-linear-to-br from-blue-900/80 to-indigo-900/80"
                      : "bg-linear-to-br from-gray-800/80 to-slate-800/80"
                  }`}
                >
                  {/* Number */}
                  <div className="flex items-center gap-6 mb-6">
                    <div
                      className={`text-5xl font-bold ${
                        index % 2 === 0 ? "text-blue-400" : "text-gray-400"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-3xl md:text-4xl poppins-semibold text-white mb-8 tracking-tight">
                      {service.title}
                    </h3>

                    <div className="space-y-4">
                      {service?.features?.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start gap-4">
                          <div
                            className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                              index % 2 === 0 ? "bg-blue-400" : "bg-gray-400"
                            }`}
                          ></div>
                          <span className="text-gray-200 text-base md:text-lg leading-relaxed">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative mt-40 p-16 rounded-3xl overflow-hidden border border-gray-700"
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0  opacity-90"></div>
          <div className="absolute inset-0 "></div>

          {/* Content */}
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                Ready to Get Started?
              </h3>
              <p className="text-blue-50 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                Let's discuss how our comprehensive engineering services can
                bring your project to life
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to="/contactus"
                className="group relative bg-white text-gray-700 px-10 py-5 rounded-xl font-semibold text-lg overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-2xl"
              >
                <span className="relative z-10">Contact Our Team</span>
                <div className="absolute inset-0 bg-linear-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>

              <Link
                to="/projects"
                className="group relative bg-white text-gray-700 px-10 py-5 rounded-xl font-semibold text-lg overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-2xl"
              >
                <span className="relative z-10">View Our Projects</span>
                <div className="absolute inset-0 bg-linear-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-4 left-4 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OurServices;
