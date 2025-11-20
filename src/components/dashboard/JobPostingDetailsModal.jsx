import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil } from "lucide-react";

const JobPostingDetailsModal = ({ isOpen, onClose, jobPosting, onEdit }) => {
  if (!jobPosting) return null;

  const formatDate = (date) => {
    if (!date) return null;
    try {
      const d = new Date(date);
      if (isNaN(d.getTime())) return null;
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      return null;
    }
  };

  const formatSalary = (salary) => {
    if (!salary || (!salary.min && !salary.max)) return null;
    const currency = 'INR';
    if (salary.min && salary.max) {
      return `${currency} ${salary.min.toLocaleString()} - ${salary.max.toLocaleString()}`;
    } else if (salary.min) {
      return `${currency} ${salary.min.toLocaleString()}+`;
    } else if (salary.max) {
      return `Up to ${currency} ${salary.max.toLocaleString()}`;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[900px] max-h-[90vh] flex flex-col poppins">
        <DialogHeader>
          <DialogTitle className="text-lg poppins-semibold">Job Posting Details</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-1">
          <div className="grid grid-cols-4 gap-x-4 gap-y-2">
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Job Title</p>
              <p className="text-sm font-medium">{jobPosting.jobTitle}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Department</p>
              <p className="text-sm">{jobPosting.department}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Location</p>
              <p className="text-sm">{jobPosting.location}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Status</p>
              <Badge variant={jobPosting.isActive ? "default" : "secondary"} className="text-xs">
                {jobPosting.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Job Type</p>
              <Badge variant="outline" className="text-xs">
                {jobPosting.jobType}
              </Badge>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Experience</p>
              <Badge variant="outline" className="text-xs">
                {jobPosting.experienceLevel}
              </Badge>
            </div>

            {jobPosting.numberOfPositions && (
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Positions</p>
                <p className="text-sm">{jobPosting.numberOfPositions}</p>
              </div>
            )}

            {formatSalary(jobPosting.salary) && (
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Salary</p>
                <p className="text-sm">{formatSalary(jobPosting.salary)}</p>
              </div>
            )}

            {jobPosting.applicationDeadline && (
              <div className="col-span-2">
                <p className="text-xs text-muted-foreground mb-0.5">Application Deadline</p>
                <p className="text-sm">{formatDate(jobPosting.applicationDeadline)}</p>
              </div>
            )}

            <div className="col-span-4">
              <p className="text-xs text-muted-foreground mb-0.5">Description</p>
              <p className="text-sm">{jobPosting.description}</p>
            </div>

            {jobPosting.responsibilities && jobPosting.responsibilities.length > 0 && (
              <div className="col-span-2">
                <p className="text-xs text-muted-foreground mb-1">Responsibilities</p>
                <div className="flex flex-wrap gap-1">
                  {jobPosting.responsibilities.map((item, index) => (
                    <Badge key={index} variant="secondary" className="text-xs max-w-full">
                      <span className="truncate">{item}</span>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {jobPosting.requirements && jobPosting.requirements.length > 0 && (
              <div className="col-span-2">
                <p className="text-xs text-muted-foreground mb-1">Requirements</p>
                <div className="flex flex-wrap gap-1">
                  {jobPosting.requirements.map((item, index) => (
                    <Badge key={index} variant="secondary" className="text-xs max-w-full">
                      <span className="truncate">{item}</span>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {jobPosting.qualifications && jobPosting.qualifications.length > 0 && (
              <div className="col-span-4">
                <p className="text-xs text-muted-foreground mb-1">Qualifications</p>
                <div className="flex flex-wrap gap-1">
                  {jobPosting.qualifications.map((item, index) => (
                    <Badge key={index} variant="secondary" className="text-xs max-w-full">
                      <span className="truncate">{item}</span>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="col-span-4">
              <p className="text-xs text-muted-foreground mb-0.5">Career ID</p>
              <p className="text-xs text-muted-foreground font-mono">{jobPosting.careerId}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t mt-3">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={() => onEdit(jobPosting)}>
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobPostingDetailsModal;
