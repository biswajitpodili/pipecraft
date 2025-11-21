import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Badge } from "@/components/ui/badge";
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
  ListChecks,
  ChevronLeft,
  ChevronRight,
  Edit,
} from "lucide-react";
import useServicesContext from "@/context/useServicesContext";
import ServiceModal from "@/components/dashboard/ServiceModal";
import ServiceDetailsModal from "@/components/dashboard/ServiceDetailsModal";
import DeleteConfirmModal from "@/components/dashboard/DeleteConfirmModal";
import { toast } from "sonner";

const Services = () => {
  const { services, loading, getServices, createService, updateService, deleteService } =
    useServicesContext();

  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("table");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  // Filter services based on search query
  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) return services;

    const query = searchQuery.toLowerCase();
    return services.filter(
      (service) =>
        service.title?.toLowerCase().includes(query) ||
        service.description?.toLowerCase().includes(query) ||
        service.features?.some((f) => f.toLowerCase().includes(query))
    );
  }, [services, searchQuery]);

  // Paginate services
  const paginatedServices = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredServices.slice(startIndex, endIndex);
  }, [filteredServices, currentPage]);

  const totalPages = Math.ceil(filteredServices.length / rowsPerPage);

  const handleRefresh = async () => {
    setRefreshing(true);
    await getServices();
    setRefreshing(false);
  };

  const handleOpenModal = (service = null) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const handleOpenDetailsModal = (service) => {
    setSelectedService(service);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedService(null);
  };

  const handleEditFromDetails = (service) => {
    setIsDetailsModalOpen(false);
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    try {
      setUpdating(true);
      if (selectedService) {
        await updateService(selectedService.serviceId, formData);
      } else {
        await createService(formData);
      }
      handleCloseModal();
    } catch (error) {
      toast.error(error.message || "Failed to save service");
    } finally {
      setUpdating(false);
    }
  };

  const handleOpenDeleteModal = (service) => {
    setServiceToDelete(service);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setServiceToDelete(null);
  };

  const handleDelete = async () => {
    if (!serviceToDelete) return;

    try {
      setDeleting(true);
      await deleteService(serviceToDelete.serviceId);
      handleCloseDeleteModal();
    } catch (error) {
      toast.error(error.message || "Failed to delete service");
    } finally {
      setDeleting(false);
    }
  };

  // const handlePreviousPage = () => {
  //   setCurrentPage((prev) => Math.max(prev - 1, 1));
  // };

  // const handleNextPage = () => {
  //   setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  // };

  if (loading && !refreshing && !updating && !deleting) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg">Loading services...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-6 pt-4 poppins">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight poppins-bold">
            Services
          </h2>
          <p className="text-muted-foreground">
            Manage all services and their details
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
            Create Service
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
            placeholder="Search by title, description, or features..."
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
        Showing {filteredServices.length} of {services.length} services
      </div>

      {viewMode === "table" ? (
        <div className="space-y-4">
          <div className="rounded-md border overflow-hidden">
            <div className="overflow-x-auto max-w-full">
              <table className="w-full min-w-[800px]">
                <thead className="bg-muted/50">
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left text-sm font-semibold poppins-semibold whitespace-nowrap">
                      Title
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold poppins-semibold whitespace-nowrap">
                      Description
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold poppins-semibold whitespace-nowrap">
                      Features
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
                  {paginatedServices.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-8 text-center text-sm text-muted-foreground"
                      >
                        No services found
                      </td>
                    </tr>
                  ) : (
                    paginatedServices.map((service) => (
                      <tr
                        key={service.serviceId}
                        className="border-b hover:bg-muted/50 transition-colors cursor-pointer"
                        onClick={() => handleOpenDetailsModal(service)}
                      >
                        <td className="px-4 py-3 text-sm font-medium">
                          {service.title}
                        </td>
                        <td className="px-4 py-3 text-sm max-w-xs">
                          <p className="truncate text-muted-foreground">
                            {service.description}
                          </p>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {service.features && service.features.length > 0 ? (
                            <Badge variant="secondary" className="text-xs">
                              {service.features.length} features
                            </Badge>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <Badge
                            variant={service.isActive ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {service.isActive ? "Active" : "Inactive"}
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
                                  handleOpenModal(service);
                                }}
                                disabled={deleting}
                              >
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenDeleteModal(service);
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
          {filteredServices.length === 0 ? (
            <div className="col-span-full text-center py-8 text-muted-foreground">
              No services found
            </div>
          ) : (
            filteredServices.map((service) => (
              <Card
                key={service.serviceId}
                className="flex flex-col cursor-pointer hover:border-primary transition-colors"
                onClick={() => handleOpenDetailsModal(service)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg poppins-semibold">
                        {service.title}
                      </CardTitle>
                      <Badge
                        variant={service.isActive ? "default" : "secondary"}
                        className="text-xs mt-2"
                      >
                        {service.isActive ? "Active" : "Inactive"}
                      </Badge>
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
                            handleOpenModal(service);
                          }}
                          disabled={deleting}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenDeleteModal(service);
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
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {service.description}
                  </p>
                  {service.features && service.features.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <ListChecks className="h-3.5 w-3.5" />
                        <span>Features</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {service.features.slice(0, 3).map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs max-w-full">
                            <span className="truncate">{feature}</span>
                          </Badge>
                        ))}
                        {service.features.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{service.features.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Modals */}
      <ServiceModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        service={selectedService}
        onSubmit={handleSubmit}
        updating={updating}
      />

      <ServiceDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        service={selectedService}
        onEdit={handleEditFromDetails}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDelete}
        title="Delete Service"
        description={`Are you sure you want to delete the service "${serviceToDelete?.title}"? This action cannot be undone.`}
        loading={deleting}
      />
    </div>
  );
};

export default Services;