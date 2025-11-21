import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  MoreVertical,
  Pencil,
  Trash2,
  RefreshCw,
  Grid3X3,
  TableIcon,
  Briefcase,
  MapPin,
  Building2,
  ChevronLeft,
  ChevronRight,
  Users,
} from "lucide-react";
import useJobPostingsContext from "@/context/useJobPostingsContext";
import JobPostingModal from "@/components/dashboard/JobPostingModal";
import JobPostingDetailsModal from "@/components/dashboard/JobPostingDetailsModal";
import DeleteConfirmModal from "@/components/dashboard/DeleteConfirmModal";
import { toast } from "sonner";

const JobPostings = () => {
  const { jobPostings, loading, getJobPostings, createJobPosting, updateJobPosting, deleteJobPosting } =
    useJobPostingsContext();

  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("table");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedJobPosting, setSelectedJobPosting] = useState(null);
  const [jobPostingToDelete, setJobPostingToDelete] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  // Filter job postings based on search query
  const filteredJobPostings = useMemo(() => {
    if (!searchQuery.trim()) return jobPostings;

    const query = searchQuery.toLowerCase();
    return jobPostings.filter(
      (job) =>
        job.jobTitle?.toLowerCase().includes(query) ||
        job.department?.toLowerCase().includes(query) ||
        job.location?.toLowerCase().includes(query) ||
        job.description?.toLowerCase().includes(query)
    );
  }, [jobPostings, searchQuery]);

  // Paginate job postings
  const paginatedJobPostings = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredJobPostings.slice(startIndex, endIndex);
  }, [filteredJobPostings, currentPage]);

  const totalPages = Math.ceil(filteredJobPostings.length / rowsPerPage);

  const handleRefresh = async () => {
    setRefreshing(true);
    await getJobPostings();
    setRefreshing(false);
  };

  const handleOpenModal = (jobPosting = null) => {
    setSelectedJobPosting(jobPosting);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJobPosting(null);
  };

  const handleOpenDetailsModal = (jobPosting) => {
    setSelectedJobPosting(jobPosting);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedJobPosting(null);
  };

  const handleEditFromDetails = (jobPosting) => {
    setIsDetailsModalOpen(false);
    setSelectedJobPosting(jobPosting);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    try {
      setUpdating(true);
      if (selectedJobPosting) {
        await updateJobPosting(selectedJobPosting.careerId, formData);
      } else {
        await createJobPosting(formData);
      }
      handleCloseModal();
    } catch (error) {
      toast.error(error.message || "Failed to save job posting");
    } finally {
      setUpdating(false);
    }
  };

  const handleOpenDeleteModal = (jobPosting) => {
    setJobPostingToDelete(jobPosting);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setJobPostingToDelete(null);
  };

  const handleDelete = async () => {
    if (!jobPostingToDelete) return;

    try {
      setDeleting(true);
      await deleteJobPosting(jobPostingToDelete.careerId);
      handleCloseDeleteModal();
    } catch (error) {
      toast.error(error.message || "Failed to delete job posting");
    } finally {
      setDeleting(false);
    }
  };

  if (loading && !refreshing && !updating && !deleting) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg">Loading job postings...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-6 pt-4 poppins">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight poppins-bold">
            Job Postings
          </h2>
          <p className="text-muted-foreground">
            Manage all job postings and career opportunities
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Create Button */}
          <Button
            variant="default"
            size="sm"
            onClick={() => handleOpenModal()}
            className="poppins-semibold bg-black hover:bg-black/80"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Job Posting
          </Button>

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
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
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
              <Grid3X3 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title, department, or location..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10"
          />
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredJobPostings.length} of {jobPostings.length} job postings
      </div>

      {viewMode === "table" ? (
        <div className="space-y-4">
          <div className="rounded-md border overflow-hidden">
            <div className="overflow-x-auto max-w-full">
              <table className="w-full min-w-[800px]">
                <thead className="bg-muted/50">
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left text-sm font-semibold poppins-semibold whitespace-nowrap">
                      Job Title
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold poppins-semibold whitespace-nowrap">
                      Department
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold poppins-semibold whitespace-nowrap">
                      Location
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold poppins-semibold whitespace-nowrap">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold poppins-semibold whitespace-nowrap">
                      Status
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold poppins-semibold whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedJobPostings.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-8 text-center text-sm text-muted-foreground"
                      >
                        No job postings found
                      </td>
                    </tr>
                  ) : (
                    paginatedJobPostings.map((job) => (
                      <tr
                        key={job.careerId}
                        className="border-b hover:bg-muted/50 transition-colors cursor-pointer"
                        onClick={() => handleOpenDetailsModal(job)}
                      >
                        <td className="px-4 py-3 text-sm font-medium">
                          {job.jobTitle}
                        </td>
                        <td className="px-4 py-3 text-sm">{job.department}</td>
                        <td className="px-4 py-3 text-sm">{job.location}</td>
                        <td className="px-4 py-3 text-sm">
                          <Badge variant="outline" className="text-xs">
                            {job.jobType}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <Badge
                            variant={job.isActive ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {job.isActive ? "Active" : "Inactive"}
                          </Badge>
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
                                  handleOpenModal(job);
                                }}
                                disabled={deleting}
                              >
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenDeleteModal(job);
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
          {filteredJobPostings.length === 0 ? (
            <div className="col-span-full text-center py-8 text-muted-foreground">
              No job postings found
            </div>
          ) : (
            filteredJobPostings.map((job) => (
              <Card
                key={job.careerId}
                className="flex flex-col cursor-pointer hover:border-primary transition-colors"
                onClick={() => handleOpenDetailsModal(job)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg poppins-semibold">
                        {job.jobTitle}
                      </CardTitle>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge
                          variant={job.isActive ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {job.isActive ? "Active" : "Inactive"}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {job.jobType}
                        </Badge>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        asChild
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={deleting}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className={"poppins-semibold"}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenModal(job);
                          }}
                          disabled={deleting}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenDeleteModal(job);
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
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Building2 className="h-3.5 w-3.5" />
                      <span>{job.department}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{job.location}</span>
                    </div>
                    {job.numberOfPositions > 1 && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-3.5 w-3.5" />
                        <span>{job.numberOfPositions} positions</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {job.description}
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    {job.experienceLevel}
                  </Badge>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Modals */}
      <JobPostingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        jobPosting={selectedJobPosting}
        onSubmit={handleSubmit}
        updating={updating}
      />

      <JobPostingDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        jobPosting={selectedJobPosting}
        onEdit={handleEditFromDetails}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDelete}
        title="Delete Job Posting"
        description={`Are you sure you want to delete the job posting "${jobPostingToDelete?.jobTitle}"? This action cannot be undone.`}
        loading={deleting}
      />
    </div>
  );
};

export default JobPostings;