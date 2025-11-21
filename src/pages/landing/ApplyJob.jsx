import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import useJobPostingsContext from "@/context/useJobPostingsContext";
import { useApplicationsContext } from "@/context/useApplicationsContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Briefcase,
  Clock,
  Calendar,
  Upload,
  ArrowLeft,
  User,
  Mail,
  Phone,
  FileText,
} from "lucide-react";
import { BiRupee } from "react-icons/bi";

const ApplyJob = () => {
  const { careerId } = useParams();
  const navigate = useNavigate();
  const { jobPostings } = useJobPostingsContext();
  const { createApplication } = useApplicationsContext();

  const [job, setJob] = useState(null);
  const [formData, setFormData] = useState({
    applicantName: "",
    applicantEmail: "",
    applicantPhone: "",
    coverLetter: "",
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeFileName, setResumeFileName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (jobPostings.length > 0) {
      const foundJob = jobPostings.find((j) => j.careerId === careerId);
      setJob(foundJob);
    }
  }, [jobPostings, careerId]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }
      setResumeFile(file);
      setResumeFileName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.applicantName ||
      !formData.applicantEmail ||
      !formData.applicantPhone
    ) {
      alert("Please fill in all required fields");
      return;
    }

    if (!resumeFile) {
      alert("Please upload your resume");
      return;
    }

    setIsSubmitting(true);

    const data = new FormData();
    data.append("careerId", careerId);
    data.append("applicantName", formData.applicantName);
    data.append("applicantEmail", formData.applicantEmail);
    data.append("applicantPhone", formData.applicantPhone);
    data.append("coverLetter", formData.coverLetter);
    data.append("resume", resumeFile);

    const result = await createApplication(data);

    setIsSubmitting(false);

    if (result.success) {
      // Reset form
      setFormData({
        applicantName: "",
        applicantEmail: "",
        applicantPhone: "",
        coverLetter: "",
      });
      setResumeFile(null);
      setResumeFileName("");

      // Redirect to careers page after 2 seconds
      setTimeout(() => {
        navigate("/careers");
      }, 2000);
    }
  };

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

  if (!job) {
    return (
      <div className="bg-gray-50 poppins min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-gray-900 border-r-transparent mb-4"></div>
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job.isActive) {
    return (
      <div className="bg-gray-50 poppins min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Position Not Available
          </h2>
          <p className="text-gray-600 mb-6">
            This job posting is no longer accepting applications.
          </p>
          <Link to="/careers">
            <Button className="bg-black hov ``er:bg-black/80 poppins-semibold">
              View All Openings
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 poppins min-h-screen">
      {/* Header */}
      <motion.section
        className="bg-gray-900 text-white pt-20 px-6 pb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto max-w-4xl">
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Openings
          </Link>

          <motion.h1
            className="text-4xl font-bold mb-4 poppins-semibold"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {job.jobTitle}
          </motion.h1>

          <div className="flex flex-wrap gap-4 text-gray-300">
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              {job.department}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {job.location}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {job.jobType}
            </div>
            <Badge className="bg-green-600 hover:bg-green-600">
              {job.numberOfPositions}{" "}
              {job.numberOfPositions === 1 ? "Opening" : "Openings"}
            </Badge>
          </div>
        </div>
      </motion.section>

      {/* Content */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Job Details */}
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="poppins-semibold">
                    Job Description
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {job.description}
                  </p>
                </CardContent>
              </Card>

              {job.responsibilities && (
                <Card>
                  <CardHeader>
                    <CardTitle className="poppins-semibold">
                      Responsibilities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul>
                      {job.responsibilities.map((resp, index) => (
                        <li key={index} className="mb-2 flex items-start">
                          <span className="mr-2 w-2">•</span>
                          <span className="text-gray-700 leading-relaxed">
                            {resp}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {job.requirements && (
                <Card>
                  <CardHeader>
                    <CardTitle className="poppins-semibold">
                      Requirements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul>
                      {job.requirements.map((req, index) => (
                        <li key={index} className="mb-2 flex items-start">
                          <span className="mr-2 w-2">•</span>
                          <span className="text-gray-700 leading-relaxed">
                            {req}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {job.qualifications && (
                <Card>
                  <CardHeader>
                    <CardTitle className="poppins-semibold">
                      Qualifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul>
                      {job.qualifications.map((qual, index) => (
                        <li key={index} className="mb-2 flex items-start">
                          <span className="mr-2 w-2">•</span>
                          <span className="text-gray-700 leading-relaxed">
                            {qual}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Application Form */}
            <div className="md:col-span-1">
              <Card className="sticky top-[10vh]">
                <CardHeader>
                  <CardTitle className="poppins-semibold">
                    Apply for this Position
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="flex items-center gap-2 text-sm"
                      >
                        <User className="h-3.5 w-3.5" />
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        value={formData.applicantName}
                        onChange={(e) =>
                          handleChange("applicantName", e.target.value)
                        }
                        placeholder="John Doe"
                        required
                        className="h-9"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="flex items-center gap-2 text-sm"
                      >
                        <Mail className="h-3.5 w-3.5" />
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.applicantEmail}
                        onChange={(e) =>
                          handleChange("applicantEmail", e.target.value)
                        }
                        placeholder="john@example.com"
                        required
                        className="h-9"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="flex items-center gap-2 text-sm"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        Phone *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.applicantPhone}
                        onChange={(e) =>
                          handleChange("applicantPhone", e.target.value)
                        }
                        placeholder="+1 234 567 8900"
                        required
                        className="h-9"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="resume"
                        className="flex items-center gap-2 text-sm"
                      >
                        <Upload className="h-3.5 w-3.5" />
                        Resume/CV * (PDF, Max 5MB)
                      </Label>
                      <div className="relative">
                        <Input
                          id="resume"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="hidden"
                          required
                        />
                        <label
                          htmlFor="resume"
                          className="flex items-center justify-center gap-2 w-full h-9 px-3 border border-input bg-background rounded-md cursor-pointer hover:bg-accent transition-colors"
                        >
                          <Upload className="h-4 w-4" />
                          <span className="text-sm truncate">
                            {resumeFileName || "Choose file"}
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="coverLetter"
                        className="flex items-center gap-2 text-sm"
                      >
                        <FileText className="h-3.5 w-3.5" />
                        Cover Letter (Optional)
                      </Label>
                      <Textarea
                        id="coverLetter"
                        value={formData.coverLetter}
                        onChange={(e) =>
                          handleChange("coverLetter", e.target.value)
                        }
                        placeholder="Tell us why you're interested in this position..."
                        rows={4}
                        className="resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-black hover:bg-black/80 poppins-semibold"
                      disabled={isSubmitting}
                    >
                      {isSubmitting
                        ? "Submitting..."
                        : "Submit Application"}
                    </Button>
                  </form>

                  <div className="mt-6 pt-6 border-t space-y-3 text-sm text-gray-600">
                    {job.experienceLevel && (
                      <div>
                        <span className="poppins-semibold">Experience:</span>{" "}
                        {job.experienceLevel}
                      </div>
                    )}
                    {job.salary && (
                      <div className="flex items-center gap-1">
                        <BiRupee className="h-5 w-5" />
                        {job.salary.min} - {job.salary.max}
                      </div>
                    )}
                    {job.applicationDeadline && (
                      <div className="flex items-center gap-1.5 poppins-semibold">
                        <Calendar className="h-4 w-4" />
                        Deadline: {formatDate(job.applicationDeadline)}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApplyJob;
