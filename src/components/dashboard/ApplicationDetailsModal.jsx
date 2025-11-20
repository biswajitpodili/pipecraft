import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, Briefcase, FileText, Calendar, ExternalLink } from "lucide-react";

const ApplicationDetailsModal = ({ isOpen, onClose, application }) => {
  if (!application) return null;

  const formatDate = (date) => {
    if (!date) return null;
    try {
      const d = new Date(date);
      if (isNaN(d.getTime())) return null;
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch {
      return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] poppins max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl poppins-semibold">Application Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 py-2 overflow-y-auto">
          {/* Applicant Name */}
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{application.applicantName}</span>
          </div>

          {/* Email */}
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{application.applicantEmail}</span>
          </div>

          {/* Phone */}
          {application.applicantPhone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{application.applicantPhone}</span>
            </div>
          )}

          {/* Career ID */}
          <div className="flex items-center gap-2 text-sm">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Job ID: {application.careerId}</span>
          </div>

          {/* Applied At */}
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{formatDate(application.appliedAt)}</span>
          </div>

          {/* Cover Letter */}
          {application.coverLetter && (
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span className="text-xs font-medium">Cover Letter</span>
              </div>
              <p className="text-sm whitespace-pre-wrap border rounded-md p-2.5 bg-muted/30 text-muted-foreground">
                {application.coverLetter}
              </p>
            </div>
          )}

          {/* Resume Link */}
          {application.resumeLink && (
            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => window.open(application.resumeLink, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Resume
              </Button>
            </div>
          )}

          {/* Application ID */}
          <div className="text-xs font-mono text-muted-foreground/70 pt-1">
            ID: {application.applicationId}
          </div>
        </div>

        <DialogFooter className="gap-2 pt-2">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationDetailsModal;
