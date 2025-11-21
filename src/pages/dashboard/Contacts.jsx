import useContactContext from "@/context/useContactContext";
import React, { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LayoutGrid,
  TableIcon,
  Download,
  Search,
  MoreVertical,
  Trash2,
  Mail,
  Phone,
  Building2,
  Calendar,
  Edit,
  RefreshCw,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import DeleteConfirmModal from "@/components/dashboard/DeleteConfirmModal";
import ContactModal from "@/components/dashboard/ContactModal";
import ContactDetailsModal from "@/components/dashboard/ContactDetailsModal";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const Contacts = () => {
  const { contacts, loading, deleteContact, updateContact, getContacts } =
    useContactContext();
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'grid'
  const [searchTerm, setSearchTerm] = useState("");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [selectedContact, setSelectedContact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  // Get unique services for filter
  const services = useMemo(() => {
    const uniqueServices = [
      ...new Set(contacts.map((c) => c.serviceInterested)),
    ];
    return uniqueServices.filter(Boolean);
  }, [contacts]);

  // Filter contacts
  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {
      const matchesSearch =
        contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.companyName?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesService =
        serviceFilter === "all" || contact.serviceInterested === serviceFilter;

      return matchesSearch && matchesService;
    });
  }, [contacts, searchTerm, serviceFilter]);

  // Paginate contacts for table view
  const paginatedContacts = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredContacts.slice(startIndex, endIndex);
  }, [filteredContacts, currentPage]);

  const totalPages = Math.ceil(filteredContacts.length / rowsPerPage);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, serviceFilter]);

  // Export to CSV
  const exportToCSV = async () => {
    setExporting(true);
    try {
      const headers = [
        "Name",
        "Email",
        "Phone",
        "Company",
        "Service",
        "Message",
        "Date",
      ];
      const csvData = filteredContacts.map((contact) => [
        contact.name,
        contact.email,
        contact.phone,
        contact.companyName,
        contact.serviceInterested,
        contact.message,
        new Date(contact.createdAt).toLocaleDateString(),
      ]);

      const csv = [
        headers.join(","),
        ...csvData.map((row) => row.map((cell) => `"${cell || ""}"`).join(",")),
      ].join("\n");

      const blob = new Blob([csv], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `contacts-${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
    } finally {
      setExporting(false);
    }
  };

  // Export to Excel
  const exportToExcel = async () => {
    setExporting(true);
    try {
      const worksheet = XLSX.utils.json_to_sheet(
        filteredContacts.map((contact) => ({
          Name: contact.name,
          Email: contact.email,
          Phone: contact.phone || "",
          Company: contact.companyName || "",
          Service: contact.serviceInterested,
          Message: contact.message,
          Date: new Date(contact.createdAt).toLocaleDateString(),
        }))
      );

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");

      XLSX.writeFile(
        workbook,
        `contacts-${new Date().toISOString().split("T")[0]}.xlsx`
      );
    } finally {
      setExporting(false);
    }
  };

  // Export to PDF
  const exportToPDF = async () => {
    setExporting(true);
    try {
      const doc = new jsPDF("p", "mm", "a4"); // Portrait orientation A4

      // Add title
      doc.setFontSize(20);
      doc.text("Contacts Report", 14, 22);

      // Add date
      doc.setFontSize(11);
      const today = new Date();
      const formattedToday = `${today.getDate().toString().padStart(2, "0")}/${(
        today.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}/${today.getFullYear()}`;
      doc.text(`Generated on: ${formattedToday}`, 14, 32);

      // Prepare table data
      const tableColumns = [
        "Name",
        "Email",
        "Phone",
        "Service",
        "Message",
        "Date",
      ];
      const tableRows = filteredContacts.map((contact) => {
        const date = new Date(contact.createdAt);
        const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(
          date.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}/${date.getFullYear()}`;

        return [
          contact.name || "",
          contact.email || "",
          contact.phone || "-",
          contact.serviceInterested || "",
          contact.message || "",
          formattedDate,
        ];
      });

      // Add table using autoTable
      autoTable(doc, {
        head: [tableColumns],
        body: tableRows,
        startY: 40,
        styles: {
          fontSize: 8,
          cellPadding: 2,
          overflow: "linebreak",
          halign: "left",
        },
        headStyles: {
          fillColor: [0, 0, 0],
          textColor: [255, 255, 255],
          fontStyle: "bold",
          halign: "left",
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
        columnStyles: {
          0: { cellWidth: 30 }, // Name
          1: { cellWidth: 45 }, // Email
          2: { cellWidth: 25 }, // Phone
          3: { cellWidth: 35 }, // Service
          4: { cellWidth: 35 }, // Message
          5: { cellWidth: 20 }, // Date
        },
        margin: { left: 10, right: 10 },
        tableWidth: "wrap",
      });

      doc.save(`contacts-${new Date().toISOString().split("T")[0]}.pdf`);
    } catch (error) {
      console.error("PDF export failed:", error);
      toast.error(`Failed to export PDF: ${error.message}`);
    } finally {
      setExporting(false);
    }
  };

  // Refresh contacts
  const handleRefresh = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setRefreshing(true);

    try {
      await getContacts();
    } catch (error) {
      console.error("Refresh failed:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleDeleteClick = (contact) => {
    setContactToDelete(contact);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!contactToDelete) return;

    setDeleting(true);
    try {
      await deleteContact(contactToDelete.contactId);
      setIsDeleteModalOpen(false);
      setContactToDelete(null);
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete contact");
    } finally {
      setDeleting(false);
    }
  };

  const handleCloseDeleteModal = () => {
    if (!deleting) {
      setIsDeleteModalOpen(false);
      setContactToDelete(null);
    }
  };

  const handleEditContact = (contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const handleViewContact = (contact) => {
    setSelectedContact(contact);
    setIsDetailsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedContact(null);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedContact(null);
  };

  const handleUpdateContact = async (contactId, updatedData) => {
    setUpdating(true);
    await updateContact(contactId, updatedData);
    setUpdating(false);
  };

  if (loading && !refreshing && !updating && !deleting) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg">Loading contacts...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-6 pt-4 poppins">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight poppins-bold">
            Contacts
          </h2>
          <p className="text-muted-foreground">
            Manage all contact form submissions
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

          {/* Export Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={"poppins-semibold"}
                disabled={exporting || loading || filteredContacts.length === 0}
              >
                {exporting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Download className="mr-2 h-4 w-4" />
                )}
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={exportToCSV}
                disabled={exporting}
                className={"poppins"}
              >
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={exportToExcel}
                disabled={exporting}
                className={"poppins"}
              >
                Export as Excel
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={exportToPDF}
                disabled={exporting}
                className={"poppins"}
              >
                Export as PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={serviceFilter} onValueChange={setServiceFilter}>
          <SelectTrigger className="w-full sm:w-[250px]">
            <SelectValue placeholder="Filter by service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Services</SelectItem>
            {services.map((service) => (
              <SelectItem key={service} value={service} className={"poppins"}>
                {service}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredContacts.length} of {contacts.length} contacts
      </div>
      {viewMode === "table" ? (
        <div className="space-y-4">
          <div className="rounded-md border overflow-hidden">
            <div className="overflow-x-auto max-w-full">
              <table className="w-full min-w-[800px]">
                <thead className="bg-muted/50">
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left text-sm font-semibold poppins-semibold whitespace-nowrap">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold poppins-semibold whitespace-nowrap">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold poppins-semibold whitespace-nowrap">
                      Company
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold poppins-semibold whitespace-nowrap">
                      Service
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold poppins-semibold whitespace-nowrap">
                      Date
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold poppins-semibold whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedContacts.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-8 text-center text-sm text-muted-foreground"
                      >
                        No contacts found
                      </td>
                    </tr>
                  ) : (
                    paginatedContacts.map((contact) => {
                      const date = new Date(contact.createdAt);
                      const formattedDate = `${date
                        .getDate()
                        .toString()
                        .padStart(2, "0")}/${(date.getMonth() + 1)
                        .toString()
                        .padStart(2, "0")}/${date.getFullYear()}`;
                      return (
                        <tr
                          key={contact.contactId}
                          className="border-b hover:bg-muted/50 transition-colors cursor-pointer"
                          onClick={() => handleViewContact(contact)}
                        >
                          <td className="px-4 py-3 text-sm font-medium">
                            {contact.name}
                          </td>
                          <td className="px-4 py-3 text-sm">{contact.email}</td>
                          <td className="px-4 py-3 text-sm">
                            {contact.companyName || "-"}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <Badge variant="secondary">
                              {contact.serviceInterested}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-sm">{formattedDate}</td>
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
                                    handleEditContact(contact);
                                  }}
                                  disabled={deleting}
                                >
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteClick(contact);
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
                      );
                    })
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
          {filteredContacts.length === 0 ? (
            <div className="col-span-full text-center py-8 text-muted-foreground">
              No contacts found
            </div>
          ) : (
            filteredContacts.map((contact) => {
              const date = new Date(contact.createdAt);
              const formattedDate = `${date
                .getDate()
                .toString()
                .padStart(2, "0")}/${(date.getMonth() + 1)
                .toString()
                .padStart(2, "0")}/${date.getFullYear()}`;
              return (
                <Card 
                  key={contact.contactId} 
                  className="flex gap-2 cursor-pointer hover:border-primary transition-colors"
                  onClick={() => handleViewContact(contact)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg poppins-semibold">
                          {contact.name}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {contact.companyName || "No company"}
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
                              handleEditContact(contact);
                            }}
                            disabled={deleting}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(contact);
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
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">{contact.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <Badge variant="secondary">
                        {contact.serviceInterested}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{formattedDate}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      )}

      {/* Contact Modal */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        contact={selectedContact}
        onUpdate={handleUpdateContact}
        updating={updating}
      />

      {/* Contact Details Modal */}
      <ContactDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        contact={selectedContact}
        onEdit={handleEditContact}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Delete Contact"
        description={`Are you sure you want to delete the contact from "${contactToDelete?.name}"? This action cannot be undone.`}
        loading={deleting}
      />
    </div>
  );
};

export default Contacts;
