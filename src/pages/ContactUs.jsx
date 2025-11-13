import {  useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
} from "react-icons/fa";

const Contactus = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  const contactInfo = [
    {
      icon: <FaPhone className="text-3xl" />,
      title: "Phone",
      details: ["+91 8758702712", "+91 8320068081"],
    },
    {
      icon: <FaEnvelope className="text-3xl" />,
      title: "Email",
      details: ["pipecraftdesign@gmail.com"],
    },
    {
      icon: <FaMapMarkerAlt className="text-3xl" />,
      title: "Location",
      details: ["FF 5, TIRUPATI MALL, KANSA ROAD VISNAGAR-384315"],
    },
    {
      icon: <FaClock className="text-3xl" />,
      title: "Working Hours",
      details: [
        "Monday - Friday: 9:00 AM - 6:00 PM",
        "Saturday: 9:00 AM - 1:00 PM",
      ],
    },
  ];

  const services = [
    "Process Engineering",
    "Piping Engineering",
    "Mechanical Engineering",
    "Structural Engineering",
    "Electrical & Instrumentation",
    "Fire Fighting System Design",
  ];

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
            Contact Us
          </motion.h1>
          <motion.p
            className="text-xl leading-relaxed"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Get in touch with us to discuss your engineering requirements and
            how we can help bring your projects to life
          </motion.p>
        </div>
      </motion.section>

      {/* Contact Info Cards */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-gray-400 transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
              >
                <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center mb-4">
                  <div className="text-gray-700">{info.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {info.title}
                </h3>
                <div className="space-y-2">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600 text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Send Us a Message
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and our team will get back to you within
                24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-gray-900 transition-colors duration-300"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-gray-900 transition-colors duration-300"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-gray-900 transition-colors duration-300"
                    placeholder="+91 XXX XXX XXXX"
                  />
                </div>

                {/* Company */}
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-gray-900 transition-colors duration-300"
                    placeholder="Your Company"
                  />
                </div>

                {/* Service */}
                <div>
                  <label
                    htmlFor="service"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-gray-900 transition-colors duration-300"
                  >
                    <option value="">Select a service</option>
                    {services.map((service, index) => (
                      <option key={index} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-gray-900 transition-colors duration-300 resize-none"
                    placeholder="Tell us about your project requirements..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="w-full bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>

            {/* Map/Info Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col space-y-6"
            >
              <div className="bg-gray-100 rounded-2xl p-8 flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Why Choose Us?
                </h3>
                <ul className="space-y-4">
                  {[
                    "Expert team with extensive industry experience",
                    "Advanced software tools and technology",
                    "Commitment to quality and timely delivery",
                    "Comprehensive engineering solutions",
                    "Proven track record with leading clients",
                    "24/7 support for ongoing projects",
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-3 text-gray-700"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 shrink-0"></div>
                      <span className="text-sm leading-relaxed">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Social Media */}
              <div className="bg-gray-700 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Connect With Us
                </h3>
                <p className="text-gray-400 mb-6 text-sm">
                  Follow us on social media for updates and insights
                </p>
                <div className="flex gap-4">
                  <motion.a
                    href="https://www.linkedin.com/in/pipecraft-design-solutions-834521374"
                    className="w-12 h-12 bg-white rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaLinkedin className="text-gray-900 text-xl" />
                  </motion.a>
                  
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      {/* <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
              Visit Our Office
            </h2>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3653.169431746977!2d72.52891067493552!3d23.70564279049391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c50032149c929%3A0x777c1877360f6a87!2sTIRUPATI%20SHOPPING%20MALL!5e0!3m2!1sen!2sin!4v1762026633446!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Pipe Craft Office Location"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section> */}
    </div>
  );
};

export default Contactus;
