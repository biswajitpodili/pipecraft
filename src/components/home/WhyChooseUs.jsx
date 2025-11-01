

import { FaUsers, FaBriefcase, FaRupeeSign, FaCog } from "react-icons/fa";

const WhyChooseUs = () => {
  return (
    <div className="py-20 px-4 md:px-8 lg:px-16 bg-linear-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-light text-center mb-6 text-gray-900 tracking-tight">
            Why Choose Us
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-3xl mx-auto text-lg leading-relaxed font-light">
            We deliver excellence in engineering solutions with a commitment to
            quality, efficiency, and innovation
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 ">
            {/* Experienced Team */}
            <div className=" group bg-white p-10 rounded-xl shadow-xl border border-gray-200 hover:border-gray-200 hover:shadow-xl  transition-all duration-500 ease-out transform hover:-translate-y-1 relative overflow-hidden">
              <div className="flex justify-center mb-8">
                <div className="">
                  <FaUsers className="w-18 h-18 text-gray-600 group-hover:text-gray-700 transition-colors duration-300" />
                </div>
              </div>
              <h3 className="text-2xl poppins-semibold mb-6 text-center text-gray-900 tracking-tight">
                Experienced Team
              </h3>
              <p className="text-gray-600 text-center text-base ">
                Our engineers are highly skilled and well-versed in leading
                design and analysis software like PDMS, E3D, AutoCAD, CEASER,
                STAADPRO, and TEKLA.
              </p>
              {/* Particle Gear */}
              <div className="absolute -top-8 -right-8 opacity-20  duration-300">
                <FaCog
                  className="w-[15vw] h-[15vw] max-w-32 max-h-32 text-black/30 animate-spin"
                  style={{ animationDuration: "8s" }}
                />
              </div>
            </div>

            {/* Comprehensive Services */}
            <div className=" group bg-white p-10 rounded-xl shadow-xl border border-gray-200 hover:border-gray-200 hover:shadow-xl transition-all duration-500 ease-out transform hover:-translate-y-1 relative overflow-hidden">
              <div className="flex justify-center mb-8">
                <div className="">
                  <FaBriefcase className="w-18 h-18 text-gray-600 group-hover:text-gray-700 transition-colors duration-300" />
                </div>
              </div>
              <h3 className="text-2xl poppins-semibold mb-6 text-center text-gray-900 tracking-tight">
                Comprehensive Services
              </h3>
              <p className="text-gray-600 text-center text-base ">
                From process and piping to mechanical, structural, and E&I
                engineering, we provide end-to-end project support.
              </p>
              {/* Particle Gear */}
              <div className="absolute -top-8 -right-8 opacity-20  duration-300">
                <FaCog
                  className="w-[15vw] h-[15vw] max-w-32 max-h-32 text-black/30 animate-spin"
                  style={{ animationDuration: "8s" }}
                />
              </div>
            </div>

            {/* Quality & Cost Efficiency */}
            <div className=" group bg-white shadow-xl p-10 rounded-xl border border-gray-200 hover:border-gray-200 hover:shadow-xl transition-all duration-500 ease-out transform hover:-translate-y-1 relative overflow-hidden">
              <div className="flex justify-center mb-8">
                <div className="">
                  <FaRupeeSign className="w-18 h-18 text-gray-600 group-hover:text-gray-700 transition-colors duration-300" />
                </div>
              </div>
              <h3 className="text-2xl poppins-semibold mb-6 text-center text-gray-900 tracking-tight">
                Quality & Cost Efficiency
              </h3>
              <p className="text-gray-600 text-center text-base ">
                We focus on optimized piping layouts and designs that meet
                process, maintenance, and safety requirements while minimizing
                cost.
              </p>
              {/* Particle Gear */}
              <div className="absolute -top-8 -right-8 opacity-20  duration-300">
                <FaCog
                  className="w-[15vw] h-[15vw] max-w-32 max-h-32 text-black/30 animate-spin"
                  style={{ animationDuration: "8s" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default WhyChooseUs