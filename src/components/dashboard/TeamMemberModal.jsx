import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Mail, Lock, Phone, Calendar, Shield, Image as ImageIcon } from "lucide-react";

const TeamMemberModal = ({ isOpen, onClose, onSave, member, isEdit, updating }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    role: "user",
    avatar: null,
  });
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    if (isEdit && member) {
      setFormData({
        name: member.name || "",
        email: member.email || "",
        password: "",
        phone: member.phone || "",
        age: member.age || "",
        role: member.role || "user",
        avatar: null,
      });
      setAvatarPreview(member.avatar || null);
    } else {
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        age: "",
        role: "user",
        avatar: null,
      });
      setAvatarPreview(null);
    }
  }, [isEdit, member, isOpen]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, avatar: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error("Failed to save team member:", error);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: member?.name || "",
      email: member?.email || "",
      password: "",
      phone: member?.phone || "",
      age: member?.age || "",
      role: member?.role || "user",
      avatar: null,
    });
    setAvatarPreview(member?.avatar || null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] poppins max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl poppins-semibold">
            {isEdit ? "Edit Team Member" : "Add Team Member"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
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
                placeholder="Enter full name"
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
                placeholder="Enter email address"
              />
            </div>

            {/* Password (only for create) */}
            {!isEdit && (
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-sm flex items-center gap-2">
                  <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  required={!isEdit}
                  className="h-9"
                  placeholder="Enter password"
                />
              </div>
            )}

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
                required
                className="h-9"
                placeholder="Enter phone number"
              />
            </div>

            {/* Age */}
            <div className="space-y-1.5">
              <Label htmlFor="age" className="text-sm flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                Age
              </Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => handleChange("age", e.target.value)}
                className="h-9"
                placeholder="Enter age (optional)"
              />
            </div>

            {/* Role */}
            <div className="space-y-1.5">
              <Label htmlFor="role" className="text-sm flex items-center gap-2">
                <Shield className="h-3.5 w-3.5 text-muted-foreground" />
                Role
              </Label>
              <Select value={formData.role} onValueChange={(value) => handleChange("role", value)}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Avatar Upload */}
            <div className="space-y-1.5">
              <Label htmlFor="avatar" className="text-sm flex items-center gap-2">
                <ImageIcon className="h-3.5 w-3.5 text-muted-foreground" />
                Avatar
              </Label>
              <Input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="h-9"
              />
              {avatarPreview && (
                <div className="mt-2">
                  <img
                    src={avatarPreview}
                    alt="Preview"
                    className="w-20 h-20 rounded-full object-cover border"
                  />
                </div>
              )}
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
              {updating ? "Saving..." : isEdit ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TeamMemberModal;
