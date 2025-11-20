import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, FileText, ListChecks, Hash, Pencil } from "lucide-react";

const ServiceDetailsModal = ({ isOpen, onClose, service, onEdit }) => {
  if (!service) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[500px] max-h-[90vh] flex flex-col poppins">
        <DialogHeader>
          <DialogTitle className="text-lg poppins-semibold">Service Details</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-3 px-1">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Briefcase className="h-3.5 w-3.5" />
              <span className="poppins-semibold">Title</span>
            </div>
            <p className="text-sm font-medium">{service.title}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <FileText className="h-3.5 w-3.5" />
              <span className="poppins-semibold">Description</span>
            </div>
            <p className="text-sm">{service.description}</p>
          </div>

          {service.features && service.features.length > 0 && (
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <ListChecks className="h-3.5 w-3.5" />
                <span className="poppins-semibold">Features</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {service.features.map((feature, index) => (
                  <Badge key={index} variant="secondary" className="text-xs max-w-full flex items-center">
                   <span className="truncate">{feature}</span>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <span className="poppins-semibold">Status</span>
            </div>
            <Badge variant={service.isActive ? "default" : "secondary"} className="text-xs">
              {service.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Hash className="h-3.5 w-3.5" />
              <span className="poppins-semibold">Service ID</span>
            </div>
            <p className="text-xs text-muted-foreground font-mono">{service.serviceId}</p>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t mt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={() => onEdit(service)} className={'bg-black'}>
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDetailsModal;
