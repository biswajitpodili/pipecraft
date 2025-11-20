import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Briefcase, FileText, ListChecks, X } from "lucide-react";

const ServiceModal = ({ isOpen, onClose, service, onSubmit, updating }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    features: [],
    isActive: true,
  });
  const [featureInput, setFeatureInput] = useState("");

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title || "",
        description: service.description || "",
        features: service.features || [],
        isActive: service.isActive !== undefined ? service.isActive : true,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        features: [],
        isActive: true,
      });
    }
    setFeatureInput("");
  }, [service, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleAddFeature = () => {
    if (featureInput.trim() && featureInput.length >= 2) {
      setFormData({
        ...formData,
        features: [...formData.features, featureInput.trim()],
      });
      setFeatureInput("");
    }
  };

  const handleRemoveFeature = (index) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddFeature();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[500px] max-h-[90vh] flex flex-col poppins">
        <DialogHeader>
          <DialogTitle className="text-lg poppins-semibold">
            {service ? "Edit Service" : "Add New Service"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto space-y-3 px-1">
            <div className="space-y-1.5">
              <Label htmlFor="title" className="text-sm flex items-center gap-1.5 poppins-semibold">
                <Briefcase className="h-3.5 w-3.5" />
                Title
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter service title"
                required
                minLength={2}
                maxLength={100}
                className="h-9"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="description" className="text-sm flex items-center gap-1.5 poppins-semibold">
                <FileText className="h-3.5 w-3.5" />
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter service description"
                required
                minLength={10}
                maxLength={1000}
                rows={4}
                className="resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="features" className="text-sm flex items-center gap-1.5 poppins-semibold">
                <ListChecks className="h-3.5 w-3.5" />
                Features
              </Label>
              <div className="flex gap-2">
                <Input
                  id="features"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add a feature and press Enter"
                  minLength={2}
                  maxLength={200}
                  className="h-9"
                />
                <Button
                  type="button"
                  onClick={handleAddFeature}
                  disabled={!featureInput.trim() || featureInput.length < 2}
                  size="sm"
                
                  className="h-9 bg-black"
                >
                  Add
                </Button>
              </div>
              {formData.features.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs gap-1 max-w-full flex items-center">
                      <span className="truncate">{feature}</span>
                      <button
                        type="button"
                        className="shrink-0 ml-1"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleRemoveFeature(index);
                        }}
                      >
                        <X className="h-3 w-3 hover:text-red-500" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between space-y-1.5">
              <Label htmlFor="isActive" className="text-sm">
                Active Status
              </Label>
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t mt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={updating}>
              Cancel
            </Button>
            <Button type="submit" disabled={updating} className={'bg-black'}>
              {updating ? "Saving..." : service ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceModal;
