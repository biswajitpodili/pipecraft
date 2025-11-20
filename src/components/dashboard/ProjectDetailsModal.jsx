import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Briefcase, Building2, FileText, Image as ImageIcon } from "lucide-react";

const ProjectDetailsModal = ({ isOpen, onClose, project, onEdit }) => {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] poppins max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl poppins-semibold">Project Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 py-2 overflow-y-auto">
          {/* Project Image */}
          {project.image && (
            <div className="w-full">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-48 object-cover rounded-md border"
              />
            </div>
          )}

          {/* Name */}
          <div className="flex items-center gap-2 text-sm">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{project.name}</span>
          </div>

          {/* Client */}
          <div className="flex items-center gap-2 text-sm">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <span>{project.client}</span>
          </div>

          {/* Scope */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="h-4 w-4" />
              <span className="text-xs font-medium">Scope</span>
            </div>
            <p className="text-sm whitespace-pre-wrap border rounded-md p-2.5 bg-muted/30 text-muted-foreground">
              {project.scope}
            </p>
          </div>

          {/* Project ID */}
          <div className="text-xs font-mono text-muted-foreground/70 pt-1">
            ID: {project.projectId}
          </div>
        </div>

        <DialogFooter className="gap-2 pt-2">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={() => {
              onClose();
              onEdit(project);
            }}
            className="poppins-semibold bg-black hover:bg-black/80"
          >
            Edit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailsModal;
