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
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, Building2, FileText, Image as ImageIcon } from "lucide-react";

const ProjectModal = ({ isOpen, onClose, project, onUpdate, onCreate, updating }) => {
  const [formData, setFormData] = useState({
    name: "",
    client: "",
    scope: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const isEdit = !!project;

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || "",
        client: project.client || "",
        scope: project.scope || "",
        image: null,
      });
      setImagePreview(project.image || null);
    } else {
      setFormData({
        name: "",
        client: "",
        scope: "",
        image: null,
      });
      setImagePreview(null);
    }
  }, [project]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await onUpdate(project.projectId, formData);
      } else {
        await onCreate(formData);
      }
      onClose();
    } catch (error) {
      console.error("Failed to save project:", error);
      alert(`Failed to ${isEdit ? "update" : "create"} project`);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: project?.name || "",
      client: project?.client || "",
      scope: project?.scope || "",
      image: null,
    });
    setImagePreview(project?.image || null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] poppins max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl poppins-semibold">
            {isEdit ? "Edit Project" : "Create Project"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="space-y-3 py-2 overflow-y-auto">
            {/* Name */}
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-sm flex items-center gap-2">
                <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
                Project Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
                className="h-9"
                placeholder="Enter project name"
              />
            </div>

            {/* Client */}
            <div className="space-y-1.5">
              <Label htmlFor="client" className="text-sm flex items-center gap-2">
                <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                Client
              </Label>
              <Input
                id="client"
                value={formData.client}
                onChange={(e) => handleChange("client", e.target.value)}
                required
                className="h-9"
                placeholder="Enter client name"
              />
            </div>

            {/* Scope */}
            <div className="space-y-1.5">
              <Label htmlFor="scope" className="text-sm flex items-center gap-2">
                <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                Scope
              </Label>
              <Textarea
                id="scope"
                value={formData.scope}
                onChange={(e) => handleChange("scope", e.target.value)}
                rows={3}
                required
                className="text-sm resize-none"
                placeholder="Describe project scope..."
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-1.5">
              <Label htmlFor="image" className="text-sm flex items-center gap-2">
                <ImageIcon className="h-3.5 w-3.5 text-muted-foreground" />
                Project Image
              </Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="h-9"
              />
              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-md border"
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

export default ProjectModal;
