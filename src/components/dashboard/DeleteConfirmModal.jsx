import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, title, description, loading = false }) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose} >
      <AlertDialogContent className={"poppins"}>
        <AlertDialogHeader>
          <AlertDialogTitle className={"poppins-bold"}>{title || "Are you absolutely sure?"}</AlertDialogTitle>
          <AlertDialogDescription>
            {description || "This action cannot be undone. This will permanently delete this item from the database."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className={"poppins"}>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            {loading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmModal;
