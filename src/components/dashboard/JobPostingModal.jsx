import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase, MapPin, Building2, FileText, ListChecks, DollarSign, Calendar, X, Users } from "lucide-react";
import { FaRupeeSign } from "react-icons/fa";

const JobPostingModal = ({ isOpen, onClose, jobPosting, onSubmit, updating }) => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    department: "",
    location: "",
    jobType: "Full-time",
    experienceLevel: "Mid Level",
    description: "",
    responsibilities: [],
    requirements: [],
    qualifications: [],
    salary: {
      min: "",
      max: "",
      currency: "INR",
    },
    isActive: true,
    numberOfPositions: 1,
    applicationDeadline: "",
  });

  const [responsibilityInput, setResponsibilityInput] = useState("");
  const [requirementInput, setRequirementInput] = useState("");
  const [qualificationInput, setQualificationInput] = useState("");

  useEffect(() => {
    if (jobPosting) {
      let formattedDeadline = "";
      if (jobPosting.applicationDeadline) {
        try {
          const date = new Date(jobPosting.applicationDeadline);
          if (!isNaN(date.getTime())) {
            formattedDeadline = date.toISOString().split('T')[0];
          }
        } catch (error) {
          console.error("Invalid date:", error);
        }
      }

      setFormData({
        jobTitle: jobPosting.jobTitle || "",
        department: jobPosting.department || "",
        location: jobPosting.location || "",
        jobType: jobPosting.jobType || "Full-time",
        experienceLevel: jobPosting.experienceLevel || "Mid Level",
        description: jobPosting.description || "",
        responsibilities: jobPosting.responsibilities || [],
        requirements: jobPosting.requirements || [],
        qualifications: jobPosting.qualifications || [],
        salary: {
          min: jobPosting.salary?.min || "",
          max: jobPosting.salary?.max || "",
          currency: jobPosting.salary?.currency || "INR",
        },
        isActive: jobPosting.isActive !== undefined ? jobPosting.isActive : true,
        numberOfPositions: jobPosting.numberOfPositions || 1,
        applicationDeadline: formattedDeadline,
      });
    } else {
      setFormData({
        jobTitle: "",
        department: "",
        location: "",
        jobType: "Full-time",
        experienceLevel: "Mid Level",
        description: "",
        responsibilities: [],
        requirements: [],
        qualifications: [],
        salary: {
          min: "",
          max: "",
          currency: "INR",
        },
        isActive: true,
        numberOfPositions: 1,
        applicationDeadline: "",
      });
    }
    setResponsibilityInput("");
    setRequirementInput("");
    setQualificationInput("");
  }, [jobPosting, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const submitData = {
      ...formData,
      salary: formData.salary.min || formData.salary.max ? {
        min: formData.salary.min ? Number(formData.salary.min) : undefined,
        max: formData.salary.max ? Number(formData.salary.max) : undefined,
        currency: formData.salary.currency,
      } : undefined,
      numberOfPositions: Number(formData.numberOfPositions),
      applicationDeadline: formData.applicationDeadline || undefined,
    };
    
    onSubmit(submitData);
  };

  const handleAddItem = (field, input, setInput) => {
    if (input.trim() && input.length >= 2) {
      setFormData({
        ...formData,
        [field]: [...formData[field], input.trim()],
      });
      setInput("");
    }
  };

  const handleRemoveItem = (field, index) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index),
    });
  };

  const handleKeyPress = (e, field, input, setInput) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddItem(field, input, setInput);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[900px] max-h-[90vh] flex flex-col poppins">
        <DialogHeader>
          <DialogTitle className="text-lg">
            {jobPosting ? "Edit Job Posting" : "Create Job Posting"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto px-1">
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="jobTitle" className="text-sm flex items-center gap-1.5">
                  <Briefcase className="h-3.5 w-3.5" />
                  Job Title
                </Label>
                <Input
                  id="jobTitle"
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                  placeholder="e.g. Senior Software Engineer"
                  required
                  minLength={2}
                  maxLength={100}
                  className="h-9"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="department" className="text-sm flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5" />
                  Department
                </Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  placeholder="e.g. Engineering"
                  required
                  minLength={2}
                  maxLength={100}
                  className="h-9"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="location" className="text-sm flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  Location
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. New York, NY"
                  required
                  minLength={2}
                  maxLength={100}
                  className="h-9"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="jobType" className="text-sm">
                  Job Type
                </Label>
                <Select value={formData.jobType} onValueChange={(value) => setFormData({ ...formData, jobType: value })}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="experienceLevel" className="text-sm">
                  Experience Level
                </Label>
                <Select value={formData.experienceLevel} onValueChange={(value) => setFormData({ ...formData, experienceLevel: value })}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Entry Level">Entry Level</SelectItem>
                    <SelectItem value="Mid Level">Mid Level</SelectItem>
                    <SelectItem value="Senior Level">Senior Level</SelectItem>
                    <SelectItem value="Lead">Lead</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="numberOfPositions" className="text-sm flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" />
                  Positions
                </Label>
                <Input
                  id="numberOfPositions"
                  type="number"
                  min="1"
                  value={formData.numberOfPositions}
                  onChange={(e) => setFormData({ ...formData, numberOfPositions: e.target.value })}
                  className="h-9"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="salaryMin" className="text-sm flex items-center gap-1.5">
                  <FaRupeeSign className="h-3.5 w-3.5" />
                  Min Salary
                </Label>
                <Input
                  id="salaryMin"
                  type="number"
                  min="0"
                  value={formData.salary.min}
                  onChange={(e) => setFormData({ ...formData, salary: { ...formData.salary, min: e.target.value } })}
                  placeholder="e.g. 80000"
                  className="h-9"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="salaryMax" className="text-sm flex items-center gap-1.5">
                  <FaRupeeSign className="h-3.5 w-3.5" />
                  Max Salary
                </Label>
                <Input
                  id="salaryMax"
                  type="number"
                  min="0"
                  value={formData.salary.max}
                  onChange={(e) => setFormData({ ...formData, salary: { ...formData.salary, max: e.target.value } })}
                  placeholder="e.g. 120000"
                  className="h-9"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="applicationDeadline" className="text-sm flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  Application Deadline
                </Label>
                <Input
                  id="applicationDeadline"
                  type="date"
                  value={formData.applicationDeadline}
                  onChange={(e) => setFormData({ ...formData, applicationDeadline: e.target.value })}
                  className="h-9"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="isActive" className="text-sm">
                  Active Status
                </Label>
                <div className="flex items-center h-9">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                  />
                  <span className="ml-2 text-sm text-muted-foreground">
                    {formData.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              <div className="col-span-2 space-y-1.5">
                <Label htmlFor="description" className="text-sm flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" />
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the job role and overview"
                  required
                  minLength={10}
                  maxLength={5000}
                  rows={3}
                  className="resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="responsibilities" className="text-sm flex items-center gap-1.5">
                  <ListChecks className="h-3.5 w-3.5" />
                  Responsibilities
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="responsibilities"
                    value={responsibilityInput}
                    onChange={(e) => setResponsibilityInput(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, "responsibilities", responsibilityInput, setResponsibilityInput)}
                    placeholder="Add and press Enter"
                    className="h-9"
                  />
                  <Button
                    type="button"
                    onClick={() => handleAddItem("responsibilities", responsibilityInput, setResponsibilityInput)}
                    disabled={!responsibilityInput.trim() || responsibilityInput.length < 2}
                    size="sm"
                    className="h-9"
                  >
                    Add
                  </Button>
                </div>
                {formData.responsibilities.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {formData.responsibilities.map((item, index) => (
                      <Badge key={index} variant="secondary" className="text-xs gap-1 max-w-full flex items-center">
                        <span className="truncate">{item}</span>
                        <button
                          type="button"
                          className="shrink-0 ml-1"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleRemoveItem("responsibilities", index);
                          }}
                        >
                          <X className="h-3 w-3 hover:text-red-500" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="requirements" className="text-sm flex items-center gap-1.5">
                  <ListChecks className="h-3.5 w-3.5" />
                  Requirements
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="requirements"
                    value={requirementInput}
                    onChange={(e) => setRequirementInput(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, "requirements", requirementInput, setRequirementInput)}
                    placeholder="Add and press Enter"
                    className="h-9"
                  />
                  <Button
                    type="button"
                    onClick={() => handleAddItem("requirements", requirementInput, setRequirementInput)}
                    disabled={!requirementInput.trim() || requirementInput.length < 2}
                    size="sm"
                    className="h-9"
                  >
                    Add
                  </Button>
                </div>
                {formData.requirements.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {formData.requirements.map((item, index) => (
                      <Badge key={index} variant="secondary" className="text-xs gap-1 max-w-full flex items-center">
                        <span className="truncate">{item}</span>
                        <button
                          type="button"
                          className="shrink-0 ml-1"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleRemoveItem("requirements", index);
                          }}
                        >
                          <X className="h-3 w-3 hover:text-red-500" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="col-span-2 space-y-1.5">
                <Label htmlFor="qualifications" className="text-sm flex items-center gap-1.5">
                  <ListChecks className="h-3.5 w-3.5" />
                  Qualifications (Optional)
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="qualifications"
                    value={qualificationInput}
                    onChange={(e) => setQualificationInput(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, "qualifications", qualificationInput, setQualificationInput)}
                    placeholder="Add a qualification and press Enter"
                    className="h-9"
                  />
                  <Button
                    type="button"
                    onClick={() => handleAddItem("qualifications", qualificationInput, setQualificationInput)}
                    disabled={!qualificationInput.trim() || qualificationInput.length < 2}
                    size="sm"
                    className="h-9"
                  >
                    Add
                  </Button>
                </div>
                {formData.qualifications.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {formData.qualifications.map((item, index) => (
                      <Badge key={index} variant="secondary" className="text-xs gap-1 max-w-full flex items-center">
                        <span className="truncate">{item}</span>
                        <button
                          type="button"
                          className="shrink-0 ml-1"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleRemoveItem("qualifications", index);
                          }}
                        >
                          <X className="h-3 w-3 hover:text-red-500" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t mt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={updating}>
              Cancel
            </Button>
            <Button type="submit" disabled={updating} className="bg-black">
              {updating ? "Saving..." : jobPosting ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JobPostingModal;
