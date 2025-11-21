import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import useJobPostingsContext from "@/context/useJobPostingsContext";
import { MapPin, Briefcase, Clock, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BiRupee } from "react-icons/bi";

const Careers = () => {
  const { jobPostings, loading } = useJobPostingsContext();
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "N/A";
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "N/A";
    }
  };

  const activeJobs = jobPostings.filter((job) => job.isActive);

  return (
    <div className="bg-gray-50 poppins min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="text-gray-900 pt-20 px-6 pb-12"
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
            Join Our Team
          </motion.h1>
          <motion.p
            className="text-xl leading-relaxed text-gray-600"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Explore exciting career opportunities and grow with PipeCraft's
            innovative engineering team
          </motion.p>
        </div>
      </motion.section>

      {/* Job Listings */}
      <section className="py-16 px-6">
        <div className="container mx-auto ">
          {loading ? (
            <div className="text-center py-10">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-gray-900 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading job openings...</p>
            </div>
          ) : activeJobs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="mb-6">
                <Briefcase className="h-20 w-20 mx-auto text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                No Open Positions
              </h3>
              {/* <p className="text-gray-600 mb-8">
                We don't have any open positions at the moment, but we're always
                looking for talented individuals.
              </p>
              <Link to="/contact">
                <Button className="bg-black hover:bg-black/80 poppins-semibold">
                  Send Us Your Resume
                </Button>
              </Link> */}
            </motion.div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2 poppins-bold">
                  Open Positions
                </h2>
                <p className="text-gray-600">
                  {activeJobs.length}{" "}
                  {activeJobs.length === 1 ? "position" : "positions"} available
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {activeJobs.map((job, index) => (
                  <motion.div
                    key={job.careerId}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <Card className="group h-full flex flex-col hover:shadow-xl transition-all duration-300 border-gray-200 hover:border-gray-400">
                      {/* Colored Top Bar */}

                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <Badge
                            variant="secondary"
                            className="shrink-0 bg-green-100 text-green-800 hover:bg-green-100"
                          >
                            {job.numberOfPositions}{" "}
                            {job.numberOfPositions === 1
                              ? "Opening"
                              : "Openings"}
                          </Badge>
                          <div className="text-xs text-gray-500">
                            Posted {formatDate(job.createdAt)}
                          </div>
                        </div>

                        <CardTitle className="text-2xl mb-3 poppins-bold group-hover:text-gray-700 transition-colors">
                          {job.jobTitle}
                        </CardTitle>

                        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                          <div className="flex items-center gap-1.5">
                            <Briefcase className="h-4 w-4" />
                            {job.department}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4" />
                            {job.jobType}
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="flex-1 flex flex-col">
                        <p className="text-gray-700 line-clamp-3 leading-relaxed mb-4">
                          {job.description}
                        </p>

                        <div className="h-px bg-gray-200 my-2"></div>

                        <div className="space-y-2 text-sm mb-6">
                          {job.experienceLevel && (
                            <div className="flex items-center gap-1.5 text-gray-600">
                              <span className="poppins-semibold">Experience:</span>
                              {job.experienceLevel}
                            </div>
                          )}
                          {job.salary && (
                            <div className="flex items-center gap-1 text-gray-600 poppins-semibold">
                              <BiRupee className="h-5 w-5" />
                              {job.salary.min} - {job.salary.max}
                            </div>
                          )}
                          {job.applicationDeadline && (
                            <div className="flex items-center gap-1.5 text-gray-600 poppins-semibold">
                              <Calendar className="h-4 w-4" />
                              Apply by: {formatDate(job.applicationDeadline)}
                            </div>
                          )}
                        </div>

                        <div className="mt-auto">
                          <Button
                            onClick={() => navigate(`/careers/${job.careerId}`)}
                            className="w-full bg-black hover:bg-black/80 poppins-semibold"
                          >
                            Apply Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-16 px-6 bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-100 mb-4 text-center poppins-bold">
              Why Join PipeCraft?
            </h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              Be part of a team that values innovation, excellence, and growth
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Growth Opportunities",
                  description:
                    "Continuous learning and career advancement programs",
                },
                {
                  title: "Innovative Projects",
                  description: "Work on cutting-edge engineering solutions",
                },
                {
                  title: "Collaborative Culture",
                  description:
                    "Supportive team environment with experienced professionals",
                },
                {
                  title: "Competitive Benefits",
                  description:
                    "Attractive compensation and comprehensive benefits package",
                },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  className="relative bg-gray-800 border border-gray-700 rounded-xl p-8 text-center hover:border-gray-500 transition-all duration-300 overflow-hidden group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <div className="absolute inset-0 bg-linear-to-br from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/10 group-hover:to-purple-600/10 transition-all duration-500"></div>

                  <div className="absolute -top-1 -right-1 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-gray-900 font-bold text-sm poppins-semibold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-3 poppins-semibold">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>

                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-blue-500 to-purple-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                  ></motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
