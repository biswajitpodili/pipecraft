import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, Building2, Calendar, User } from "lucide-react";
import { toast } from "sonner";

const services = [
  "Process Engineering",
  "Piping Engineering",
  "Mechanical Engineering",
  "Structural Engineering",
  "Electrical & Instrumentation",
  "Fire Fighting System Design",
];

const ContactModal = ({ isOpen, onClose, contact, onUpdate, updating }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    serviceInterested: "",
    message: "",
  });

  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name || "",
        email: contact.email || "",
        phone: contact.phone || "",
        companyName: contact.companyName || "",
        serviceInterested: contact.serviceInterested || "",
        message: contact.message || "",
      });
    }
  }, [contact]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onUpdate(contact.contactId, formData);
      onClose();
    } catch (error) {
      console.error("Failed to update contact:", error);
      toast.error("Failed to update contact");
    }
  };

  const handleCancel = () => {
    // Reset form data
    setFormData({
      name: contact.name || "",
      email: contact.email || "",
      phone: contact.phone || "",
      companyName: contact.companyName || "",
      serviceInterested: contact.serviceInterested || "",
      message: contact.message || "",
    });
    onClose();
  };

  if (!contact) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] poppins max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl poppins-semibold">Edit Contact</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-1 overflow-hidden"
        >
          <div className="space-y-3 py-2 overflow-y-auto">
            {/* Name */}
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-sm flex items-center gap-2">
                <User className="h-3.5 w-3.5 text-muted-foreground" />
                Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
                className="h-9"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
                className="h-9"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-sm flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                Phone
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="h-9"
              />
            </div>

            {/* Company */}
            <div className="space-y-1.5">
              <Label htmlFor="company" className="text-sm flex items-center gap-2">
                <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                Company
              </Label>
              <Input
                id="company"
                value={formData.companyName}
                onChange={(e) => handleChange("companyName", e.target.value)}
                className="h-9"
              />
            </div>

            {/* Service */}
            <div className="space-y-1.5">
              <Label htmlFor="service" className="text-sm">Service</Label>
              <Select
                value={formData.serviceInterested}
                onValueChange={(value) =>
                  handleChange("serviceInterested", value)
                }
              >
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <Label htmlFor="message" className="text-sm">Message</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                rows={3}
                required
                className="text-sm resize-none"
              />
            </div>
          </div>

          <DialogFooter className="gap-2 pt-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCancel}
              disabled={updating}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={updating}
              className="poppins-semibold bg-black hover:bg-black/80"
            >
              {updating ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
