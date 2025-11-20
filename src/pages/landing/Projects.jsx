// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import project1 from "../../assets/1.png";
import project2 from "../../assets/2.png";
import project3 from "../../assets/3.png";
import project4 from "../../assets/4.png";
import { Link } from "react-router";

const projects = [
  {
    id: 1,
    name: "Cooling Tower for TPS IOCL Refinery",
    client: "Hamon Cooling Systems Pvt. Ltd.",
    scope:
      "Generating 3D models, designing piping layouts, and producing piping isometric drawings, piping GA and MTOs.",
    image: project1,
  },
  {
    id: 2,
    name: "MP Separator Skid",
    client: "Kuwait Oil Corporation (KOC).",
    scope: "3D modelling, E3D Project Setup, Isometrics",
    image: project2,
  },
  {
    id: 3,
    name: "PBR IOCL PROJECT (Ongoing)",
    client: "Hamon Cooling Systems Private Limited",
    scope:
      "3D modelling, piping layouts extraction, and extracting piping isometric drawings, Piping GA and Piping MTO",
    image: project3,
  },
  {
    id: 4,
    name: "Sludge catcher skid project",
    client: "Kuwait Oil Corporation (KOC)",
    scope: "3D modelling, E3D Project Setup, Isometrics",
    image: project4,
  },
];

const Projects = () => {

  return (
    <div className="bg-gray-50 poppins">
      {/* Hero Section */}
      <motion.section
        className="text-gray-900 pt-20 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto max-w-4xl text-center">
          <motion.h1
            className="text-5xl font-bold mb-6 poppins-semibold"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Our Projects
          </motion.h1>
          <motion.p
            className="text-xl leading-relaxed"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Explore our portfolio of successful engineering projects delivered
            with precision and excellence
          </motion.p>
        </div>
      </motion.section>

      {/* Vertical Timeline */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-300 hidden md:block"></div>

            {/* Projects */}
            <div className="space-y-16 md:space-y-24">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
                    <motion.div
                      className="w-6 h-6 bg-gray-900 rounded-full border-4 border-gray-50 shadow-lg"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                    ></motion.div>
                  </div>

                  {/* Project Card - Alternating Left/Right */}
                  <div
                    className={`md:w-[calc(50%-3rem)] ${
                      index % 2 === 0
                        ? "md:mr-auto md:pr-12"
                        : "md:ml-auto md:pl-12"
                    }`}
                  >
                    <motion.div
                      className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-400 transition-all duration-300 group"
                      whileHover={{ y: -8 }}
                    >
                      {/* Project Image */}
                      <div className="relative h-64 overflow-hidden bg-gray-100">
                        <img
                          src={project.image}
                          alt={project.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-lg shadow-lg">
                          <span className="text-gray-900 font-bold text-sm">
                            #{String(project.id).padStart(2, "0")}
                          </span>
                        </div>
                      </div>

                      {/* Project Details */}
                      <div className="p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-300">
                          {project.name}
                        </h3>

                        {/* Client */}
                        <div className="mb-4">
                          <p className="text-sm font-semibold text-gray-500 mb-1">
                            Client
                          </p>
                          <p className="text-gray-900 font-medium">
                            {project.client}
                          </p>
                        </div>

                        {/* Scope */}
                        <div className="mb-6">
                          <p className="text-sm font-semibold text-gray-500 mb-1">
                            Scope of Work
                          </p>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {project.scope}
                          </p>
                        </div>

                        {/* Bottom accent line */}
                        <motion.div
                          className="h-1 bg-gray-900 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: "100%" }}
                          viewport={{ once: true }}
                          transition={{
                            delay: index * 0.1 + 0.5,
                            duration: 0.6,
                          }}
                        ></motion.div>
                      </div>
                    </motion.div>

                    {/* Branch Line - connecting to timeline */}
                    <div
                      className={`hidden md:block absolute top-6 w-12 h-0.5 bg-gray-300 ${
                        index % 2 === 0 ? "right-0" : "left-0"
                      }`}
                    ></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
              Project Statistics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { number: "20+", label: "Completed Projects" },
                { number: "15+", label: "Happy Clients" },
                { number: "100%", label: "Quality Delivery" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center hover:border-gray-400 transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8 }}
                >
                  <h3 className="text-5xl font-bold text-gray-900 mb-3">
                    {stat.number}
                  </h3>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gray-900">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Let's discuss how we can help bring your engineering vision to
              life
            </p>
            <Link
              to="/contact"
              className="group relative bg-white text-gray-700 px-10 py-4 rounded-xl font-semibold text-lg overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-2xl hover:rounded-xl"
            >
              <span className="relative z-10">Get in Touch</span>
              <div className="absolute inset-0 bg-linear-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
