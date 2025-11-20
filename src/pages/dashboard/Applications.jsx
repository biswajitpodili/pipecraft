import React, { useState, useMemo } from "react";
import { useApplicationsContext } from "@/context/useApplicationsContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, LayoutGrid, TableIcon, MoreVertical, Trash2, RefreshCw, Loader2, Eye, ChevronLeft, ChevronRight, ExternalLink, User, Mail, Phone, Briefcase } from "lucide-react";
import ApplicationDetailsModal from "@/components/dashboard/ApplicationDetailsModal";
import DeleteConfirmModal from "@/components/dashboard/DeleteConfirmModal";

const Applications = () => {
  const { applications, loading, deleteApplication, getApplications } = useApplicationsContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("table");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [applicationToDelete, setApplicationToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const rowsPerPage = 6;

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        application.applicantName?.toLowerCase().includes(searchLower) ||
        application.applicantEmail?.toLowerCase().includes(searchLower) ||
        application.applicantPhone?.toLowerCase().includes(searchLower) ||
        application.careerId?.toLowerCase().includes(searchLower)
      );
    });
  }, [applications, searchTerm]);

  const paginatedApplications = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredApplications.slice(startIndex, endIndex);
  }, [filteredApplications, currentPage]);

  const totalPages = Math.ceil(filteredApplications.length / rowsPerPage);

  const handleRefresh = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setRefreshing(true);
    try {
      await getApplications();
    } catch (error) {
      console.error("Refresh failed:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleViewApplication = (application) => {
    setSelectedApplication(application);
    setIsDetailsModalOpen(true);
  };

  const handleDeleteClick = (application) => {
    setApplicationToDelete(application);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!applicationToDelete) return;
    setDeleting(true);
    try {
      const result = await deleteApplication(applicationToDelete.applicationId);
      if (result.success) {
        setIsDeleteModalOpen(false);
        setApplicationToDelete(null);
        if (paginatedApplications.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      } else {
        alert(result.message || "Failed to delete application");
      }
    } finally {
      setDeleting(false);
    }
  };

  const handleCloseDeleteModal = () => {
    if (!deleting) {
      setIsDeleteModalOpen(false);
      setApplicationToDelete(null);
    }
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedApplication(null);
  };

  const formatDate = (date) => {
    if (!date) return "-";
    try {
      const d = new Date(date);
      if (isNaN(d.getTime())) return "-";
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch {
      return "-";
    }
  };

  if (loading && !refreshing && !deleting) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg">Loading applications...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-6 pt-4 poppins">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight poppins-bold">
            Applications
          </h2>
          <p className="text-muted-foreground">
            Manage all job applications
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Refresh Button */}
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={handleRefresh}
            disabled={refreshing || loading}
            className="poppins-semibold"
            form=""
          >
            {refreshing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Refreshing
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </>
            )}
          </Button>

          {/* View Toggle */}
          <div className="flex border rounded-lg">
            <Button
              variant={viewMode === "table" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("table")}
              className="rounded-r-none"
              disabled={loading}
            >
              <TableIcon className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-l-none"
              disabled={loading}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, phone, or job ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredApplications.length} of {applications.length} applications
      </div>

      {viewMode === "table" ? (
        <div className="space-y-4">
          <div className="rounded-md border overflow-hidden">
            <div className="overflow-x-auto max-w-full">
              <table className="w-full min-w-[800px]">
                <thead className="bg-muted/50">
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left text-sm font-semibold poppins-semibold whitespace-nowrap">
                      Applicant Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold poppins-semibold whitespace-nowrap">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold poppins-semibold whitespace-nowrap">
                      Phone
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold poppins-semibold whitespace-nowrap">
                      Job ID
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold poppins-semibold whitespace-nowrap">
                      Applied At
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold poppins-semibold whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedApplications.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-8 text-center text-sm text-muted-foreground"
                      >
                        No applications found
                      </td>
                    </tr>
                  ) : (
                    paginatedApplications.map((application) => (
                      <tr
                        key={application.applicationId}
                        className="border-b hover:bg-muted/50 transition-colors cursor-pointer"
                        onClick={() => handleViewApplication(application)}
                      >
                        <td className="px-4 py-3 text-sm font-medium">
                          {application.applicantName}
                        </td>
                        <td className="px-4 py-3 text-sm">{application.applicantEmail}</td>
                        <td className="px-4 py-3 text-sm">{application.applicantPhone || "-"}</td>
                        <td className="px-4 py-3 text-sm">
                          <Badge variant="outline" className="text-xs">
                            {application.careerId}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">
                          {formatDate(application.appliedAt)}
                        </td>
                        <td className="px-4 py-3 text-sm text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                disabled={deleting}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                className={"poppins-semibold"}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(application.resumeLink, '_blank');
                                }}
                                disabled={deleting}
                              >
                                <ExternalLink className="mr-2 h-4 w-4" />
                                View Resume
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteClick(application);
                                }}
                                className="text-red-600 poppins-semibold"
                                disabled={deleting}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 poppins">
          {filteredApplications.length === 0 ? (
            <div className="col-span-full text-center py-8 text-muted-foreground">
              No applications found
            </div>
          ) : (
            filteredApplications.map((application) => (
              <Card
                key={application.applicationId}
                className="flex flex-col cursor-pointer hover:border-primary transition-colors"
                onClick={() => handleViewApplication(application)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg poppins-semibold">
                        {application.applicantName}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {application.applicantEmail}
                      </CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={deleting}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className={"poppins-semibold"}
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(application.resumeLink, '_blank');
                          }}
                          disabled={deleting}
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Resume
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(application);
                          }}
                          className="text-red-600 poppins-semibold"
                          disabled={deleting}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-3.5 w-3.5" />
                    <span>{application.applicantPhone || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
                    <Badge variant="outline" className="text-xs">
                      {application.careerId}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground pt-1">
                    Applied: {formatDate(application.appliedAt)}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Application Details Modal */}
      <ApplicationDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        application={selectedApplication}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Delete Application"
        description={`Are you sure you want to delete the application from "${applicationToDelete?.applicantName}"? This action cannot be undone.`}
        loading={deleting}
      />
    </div>
  );
};

export default Applications;