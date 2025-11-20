import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Building2, Calendar, User, MessageSquare } from "lucide-react";

const ContactDetailsModal = ({ isOpen, onClose, contact, onEdit }) => {
  if (!contact) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] poppins max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl poppins-semibold">Contact Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 py-2 overflow-y-auto">
          {/* Name */}
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{contact.name}</span>
          </div>

          {/* Email */}
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="truncate">{contact.email}</span>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{contact.phone || "-"}</span>
          </div>

          {/* Company */}
          <div className="flex items-center gap-2 text-sm">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <span>{contact.companyName || "-"}</span>
          </div>

          {/* Service */}
          <div className="flex items-center gap-2 text-sm">
            <Badge variant="secondary" className="text-xs">
              {contact.serviceInterested}
            </Badge>
          </div>

          {/* Message */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MessageSquare className="h-4 w-4" />
              <span className="text-xs font-medium">Message</span>
            </div>
            <p className="text-sm whitespace-pre-wrap border rounded-md p-2.5 bg-muted/30 text-muted-foreground">
              {contact.message}
            </p>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span className="text-xs">
              {new Date(contact.createdAt).toLocaleString()}
            </span>
          </div>

          {/* Contact ID */}
          <div className="text-xs font-mono text-muted-foreground/70 pt-1">
            ID: {contact.contactId}
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
              onEdit(contact);
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

export default ContactDetailsModal;
