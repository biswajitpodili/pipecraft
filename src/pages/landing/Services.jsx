import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FaCogs,
  FaWrench,
  FaCog,
  FaBuilding,
  FaBolt,
  FaFireExtinguisher,
} from "react-icons/fa";
import { Link } from "react-router";

const Services = () => {

  const services = [
    {
      icon: <FaCogs className="text-5xl text-blue-600" />,
      title: "Process Engineering",
      description:
        "Comprehensive process design and optimization solutions for industrial facilities.",
      features: [
        "Development of process flow diagrams (PFDs) and piping & instrumentation diagrams (P&IDs)",
        "Process simulation and optimization",
        "Equipment sizing and selection",
        "Heat and material balance calculations",
      ],
      color: "blue",
    },
    {
      icon: <FaWrench className="text-5xl text-green-600" />,
      title: "Piping Engineering",
      description:
        "Advanced piping design and engineering services with cutting-edge 3D modeling technology.",
      features: [
        "3D modelling, layout, and isometric generation",
        "Material take-off (MTO) and stress analysis of critical lines",
        "Piping GA drawings and final equipment layouts",
        "Piping support design and specifications",
      ],
      color: "green",
    },
    {
      icon: <FaCog className="text-5xl text-purple-600" />,
      title: "Mechanical Engineering",
      description:
        "Expert mechanical design and detailing for static and rotary equipment.",
      features: [
        "Design and detailing of static and rotary equipment",
        "Tank and vessel design and general arrangements",
        "Equipment layout and interface engineering",
        "Mechanical equipment specifications",
      ],
      color: "purple",
    },
    {
      icon: <FaBuilding className="text-5xl text-indigo-600" />,
      title: "Structural Engineering",
      description:
        "Structural design and analysis services ensuring safety and compliance.",
      features: [
        "Design and analysis of pipe racks, platforms, and supports",
        "Structural detailing using STAADPRO and TEKLA",
        "Integration with plant layout and civil design",
        "Foundation design and specifications",
      ],
      color: "indigo",
    },
    {
      icon: <FaBolt className="text-5xl text-yellow-600" />,
      title: "Electrical & Instrumentation",
      description:
        "Integrated electrical and instrumentation design for process automation.",
      features: [
        "Design of control systems, cable routing, and panel layouts",
        "Instrument index, loop diagrams, and field installation details",
        "Integration with process automation systems",
        "Power distribution and lighting design",
      ],
      color: "yellow",
    },
    {
      icon: <FaFireExtinguisher className="text-5xl text-red-600" />,
      title: "Fire Fighting System Design",
      description:
        "Comprehensive fire protection system design ensuring maximum safety.",
      features: [
        "Fire water network design and hydraulic calculations",
        "Equipment and piping layout for fire protection systems",
        "Compliance with national and international safety standards",
        "Fire detection and alarm system design",
      ],
      color: "red",
    },
  ];

  const benefits = [
    {
      title: "Expert Team",
      description:
        "Highly qualified engineers with extensive industry experience",
    },
    {
      title: "Advanced Tools",
      description: "Latest software including PDMS, E3D, AutoCAD, and TEKLA",
    },
    {
      title: "Quality Assurance",
      description: "Rigorous quality checks at every stage of the project",
    },
    {
      title: "Timely Delivery",
      description: "Commitment to meeting project deadlines without compromise",
    },
  ];

  return (
    <div className="bg-gray-50 poppins">
      {/* Hero Section */}
      <motion.section
        className=" text-gray-900  pt-20 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto max-w-4xl  text-center">
          <motion.h1
            className="text-5xl font-bold mb-6 poppins-semibold"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Our Services
          </motion.h1>
          <motion.p
            className="text-xl leading-relaxed"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Comprehensive engineering solutions tailored to meet your project
            requirements with expertise across multiple disciplines
          </motion.p>
        </div>
      </motion.section>

      {/* Services Grid */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-400 transition-all duration-300 flex flex-col"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
              >
                {/* Card Content */}
                <div className="p-8 flex-1 flex flex-col">
                  {/* Icon */}
                  <motion.div
                    className="mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center group-hover:bg-gray-900 transition-colors duration-300">
                      {React.cloneElement(service.icon, {
                        className:
                          "text-3xl text-gray-700 group-hover:text-white transition-colors duration-300",
                      })}
                    </div>
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3 flex-1">
                    {service.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        className="flex items-start gap-3 text-gray-700"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: index * 0.1 + featureIndex * 0.05,
                          duration: 0.3,
                        }}
                      >
                        <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 shrink-0"></div>
                        <span className="text-sm leading-relaxed">
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Bottom accent line */}
                <motion.div
                  className="h-1 bg-gray-900 mt-auto"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
                ></motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}

      {/* Process Section */}
      <section className="py-16 px-6 bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-100 mb-4 text-center">
              Our Service Delivery Process
            </h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              A streamlined approach to bring your engineering vision to life
            </p>

            <div className="relative">
              {/* Vertical Timeline for Mobile, Horizontal for Desktop */}
              <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-4 md:gap-8">
                {[
                  {
                    step: "01",
                    title: "Consultation",
                    description:
                      "Understanding your requirements and objectives",
                    icon: "💬",
                  },
                  {
                    step: "02",
                    title: "Design",
                    description: "Creating detailed engineering solutions",
                    icon: "✏️",
                  },
                  {
                    step: "03",
                    title: "Review",
                    description: "Quality checks and client feedback",
                    icon: "🔍",
                  },
                  {
                    step: "04",
                    title: "Delivery",
                    description: "Final documentation and support",
                    icon: "🚀",
                  },
                ].map((process, index) => (
                  <motion.div
                    key={index}
                    className="relative"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.15,
                      duration: 0.6,
                      type: "spring",
                      stiffness: 80,
                    }}
                  >
                    {/* Card */}
                    <motion.div
                      className="relative bg-gray-800 border border-gray-700 rounded-2xl p-6 overflow-hidden group cursor-pointer hover:border-gray-500 transition-all duration-300"
                      whileHover={{ y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Step Number Badge */}
                      <div className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-gray-900 font-bold text-xl">
                          {process.step}
                        </span>
                      </div>

                      {/* Icon */}
                      <div className="text-5xl mb-4">{process.icon}</div>

                      {/* Title */}
                      <h4 className="text-2xl font-bold text-white mb-3">
                        {process.title}
                      </h4>

                      {/* Description */}
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {process.description}
                      </p>

                      {/* Progress indicator */}
                      <motion.div
                        className="mt-4 h-1 bg-white rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{
                          delay: index * 0.15 + 0.5,
                          duration: 0.8,
                        }}
                      ></motion.div>
                    </motion.div>

                    {/* Arrow connector for desktop */}
                    {index < 3 && (
                      <motion.div
                        className="hidden md:block absolute top-1/2 -right-4 z-20 transform -translate-y-1/2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: index * 0.15 + 0.3,
                          duration: 0.5,
                        }}
                      >
                        <div className="text-4xl text-gray-500">→</div>
                      </motion.div>
                    )}

                    {/* Arrow connector for mobile */}
                    {index < 3 && (
                      <motion.div
                        className="md:hidden flex justify-center my-6"
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: index * 0.15 + 0.3,
                          duration: 0.5,
                        }}
                      >
                        <div className="text-4xl text-gray-500">↓</div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl poppins-semibold text-gray-800 mb-8 text-center">
              Industries We Serve
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                "Chemical",
                "Oil & Gas",
                "Pharmaceuticals",
                "Food & Beverage",
                "Power Generation",
                "Water Treatment",
                "Petrochemical",
                "Manufacturing",
              ].map((industry, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-600/10 flex justify-center items-center p-6 rounded-lg shadow-lg text-center font-semibold text-lg text-gray-800 hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {industry}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-100 mb-12 text-center">
              Why Choose Our Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="bg-linear-to-br from-gray-800/80 to-slate-800/80 p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <h3 className="text-xl font-bold text-gray-100 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      <section className="py-16 px-6 bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative p-12 md:p-16 rounded-3xl overflow-hidden border border-gray-600 shadow-2xl"
          >
            {/* Content */}
            <div className="relative z-10 text-center">
              <motion.div
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                  Ready to Start Your Project?
                </h3>
                <p className="text-blue-50 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                  Get in touch with our expert team to discuss your engineering
                  requirements
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
                  to="/contact"
                  className="group relative bg-white text-blue-600 px-10 py-4 rounded-xl font-semibold text-lg overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-2xl hover:scale-105"
                >
                  <span className="relative z-10">Request a Quote</span>
                </Link>

                <Link
                  to="/contact"
                  className="group border-2 border-white text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-blue-600 cursor-pointer"
                >
                  Contact Our Team
                </Link>
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-4 left-4 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl"></div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
