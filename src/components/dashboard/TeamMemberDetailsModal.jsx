import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, Calendar, Shield, Image as ImageIcon } from "lucide-react";

const TeamMemberDetailsModal = ({ isOpen, onClose, member, onEdit }) => {
  if (!member) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] poppins max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl poppins-semibold">Team Member Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 py-2 overflow-y-auto">
          {/* Avatar */}
          {member.avatar && (
            <div className="w-full flex justify-center">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-24 h-24 rounded-full object-cover border"
              />
            </div>
          )}

          {/* Name */}
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{member.name}</span>
          </div>

          {/* Email */}
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{member.email}</span>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{member.phone}</span>
          </div>

          {/* Age */}
          {member.age && (
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Age: {member.age}</span>
            </div>
          )}

          {/* Role */}
          <div className="flex items-center gap-2 text-sm">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <Badge variant={member.role === "admin" ? "default" : "secondary"} className="text-xs">
              {member.role}
            </Badge>
          </div>

          {/* User ID */}
          <div className="text-xs font-mono text-muted-foreground/70 pt-1">
            ID: {member.userId}
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
              onEdit(member);
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

export default TeamMemberDetailsModal;
