// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaIndustry, FaUsers, FaCogs, FaAward } from "react-icons/fa";
import { Link } from "react-router";

const Aboutus = () => {

  const expertise = [
    "Process Design",
    "Piping Design",
    "Mechanical Design",
    "Structural Design",
    "Electrical Design",
    "Instrumentation Design",
  ];

  const software = [
    "PDMS",
    "E3D",
    "AutoCAD",
    "CEASER",
    "STAADPRO",
    "TEKLA",
    "NAVISWORKS",
  ];

  const clients = [
    "IOCL",
    "Anupam Rasayan",
    "Hamon Cooling Systems",
    "Bills Biotech",
  ];

  const values = [
    {
      icon: <FaIndustry className="text-5xl text-white" />,
      title: "Industry Expertise",
      description:
        "Strong presence in chemical, oil & gas, skid, and tank-farm industries",
    },
    {
      icon: <FaUsers className="text-5xl text-white" />,
      title: "Expert Team",
      description:
        "Highly qualified and experienced engineers delivering world-class quality",
    },
    {
      icon: <FaCogs className="text-5xl text-white" />,
      title: "Smart Engineering",
      description:
        "Optimizing cost, space, and operational efficiency in every design",
    },
    {
      icon: <FaAward className="text-5xl text-white" />,
      title: "Trusted Partner",
      description:
        "Commitment to excellence, reliability, and client satisfaction",
    },
  ];

  return (
    <div className="bg-gray-50 poppins">
      {/* Hero Section */}
      <motion.section
        className=" text-gray-900 pt-20 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto max-w-4xl text-center poppins-semibold">
          <motion.h1
            className="text-5xl font-bold mb-6"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            About us
          </motion.h1>
           
        </div>
      </motion.section>

      {/* Who We Are Section */}
      <section className="pb-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
              Who We Are
            </h2> */}
            <div className="bg-white p-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                With a strong presence in the chemical, oil & gas, skid, and
                tank-farm industries, we bring precision, innovation, and
                efficiency to every project we undertake.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Our team of highly qualified and experienced engineers is
                skilled in using advanced software tools, ensuring world-class
                quality in design and analysis.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                At Pipe Craft, we believe in{" "}
                <span className="font-bold text-blue-600">
                  smart engineering
                </span>{" "}
                — delivering designs that not only meet technical and safety
                requirements but also optimize cost, space, and operational
                efficiency. Every project we execute reflects our commitment to
                excellence, reliability, and client satisfaction.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 px-6  bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-gray-100 mb-12 text-center">
            Our Core Values
          </h2>
          <div className="grid p-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-linear-to-br from-gray-800/80 to-slate-800/80 p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-100 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise & Software Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Expertise */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Our Expertise
              </h2>
              <div className="bg-white p-6 ">
                <ul className="space-y-3" >
                  {expertise.map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center text-lg text-gray-700"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                    >
                     
                      {index + 1}.{" "} {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Software Tools */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Advanced Tools
              </h2>
              <div className="bg-white p-6 ">
                <div className="grid grid-cols-2 gap-4">
                  {software.map((tool, index) => (
                    <motion.div
                      key={index}
                      className="bg-blue-50 px-4 py-3 rounded-lg text-center poppins-semibold text-gray-700 hover:bg-blue-100 transition-colors duration-300"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {tool}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-16 px-6 bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-100 mb-8 text-center">
              Trusted by Industry Leaders
            </h2>
            <p className="text-center text-lg text-gray-400 mb-10">
              With successful project collaborations for leading clients, we
              continue to strengthen our reputation as a trusted partner in
              industrial design engineering.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {clients.map((client, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-600 flex justify-center items-center p-6 rounded-lg shadow-lg text-center font-bold text-xl text-gray-100 hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {client}
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
                  Ready to Get Started?
                </h3>
                <p className="text-blue-50 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                  Let's discuss how our comprehensive engineering services can bring
                  your project to life
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Link to="/contact" className="group relative bg-white text-gray-700 px-10 py-4 rounded-xl font-semibold text-lg overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-2xl">
                  <span className="relative z-10">Contact Our Team</span>
                  <div className="absolute inset-0 bg-linear-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>

                <Link to="/projects" className="group border-2 border-white text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-blue-600 cursor-pointer">
                  View Our Projects
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

export default Aboutus;
