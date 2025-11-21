import React, { useState, useMemo } from "react";
import { useTeamContext } from "@/context/useTeamContext";
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
import { Search, LayoutGrid, TableIcon, MoreVertical, Edit, Trash2, RefreshCw, Loader2, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import TeamMemberModal from "@/components/dashboard/TeamMemberModal";
import TeamMemberDetailsModal from "@/components/dashboard/TeamMemberDetailsModal";
import DeleteConfirmModal from "@/components/dashboard/DeleteConfirmModal";
import { toast } from "sonner";

const Team = () => {
  const { team, loading, createTeamMember, updateTeamMember, deleteTeamMember, getTeam } = useTeamContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const rowsPerPage = 6;

  const filteredTeam = useMemo(() => {
    return team.filter((member) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        member.name?.toLowerCase().includes(searchLower) ||
        member.email?.toLowerCase().includes(searchLower) ||
        member.phone?.toLowerCase().includes(searchLower) ||
        member.role?.toLowerCase().includes(searchLower)
      );
    });
  }, [team, searchTerm]);

  const paginatedTeam = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredTeam.slice(startIndex, endIndex);
  }, [filteredTeam, currentPage]);

  const totalPages = Math.ceil(filteredTeam.length / rowsPerPage);

  const handleRefresh = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setRefreshing(true);
    try {
      await getTeam();
    } catch (error) {
      console.error("Refresh failed:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleCreateMember = () => {
    setSelectedMember(null);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleEditMember = (member) => {
    setSelectedMember(member);
    setIsEditMode(true);
    setIsModalOpen(true);
    setIsDetailsModalOpen(false);
  };

  const handleViewMember = (member) => {
    setSelectedMember(member);
    setIsDetailsModalOpen(true);
  };

  const handleDeleteClick = (member) => {
    setMemberToDelete(member);
    setIsDeleteModalOpen(true);
  };

  const handleSaveMember = async (memberData) => {
    setUpdating(true);
    try {
      if (isEditMode) {
        const result = await updateTeamMember(selectedMember.userId, memberData);
        if (result.success) {
          setIsModalOpen(false);
          setSelectedMember(null);
        } else {
          toast.error(result.message || "Failed to update team member");
        }
      } else {
        const result = await createTeamMember(memberData);
        if (result.success) {
          setIsModalOpen(false);
        } else {
          toast.error(result.message || "Failed to create team member");
        }
      }
    } finally {
      setUpdating(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!memberToDelete) return;
    setDeleting(true);
    try {
      const result = await deleteTeamMember(memberToDelete.userId);
      if (result.success) {
        setIsDeleteModalOpen(false);
        setMemberToDelete(null);
        if (paginatedTeam.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      } else {
        toast.error(result.message || "Failed to delete team member");
      }
    } finally {
      setDeleting(false);
    }
  };

  const handleCloseDeleteModal = () => {
    if (!deleting) {
      setIsDeleteModalOpen(false);
      setMemberToDelete(null);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedMember(null);
  };

  if (loading && !refreshing && !updating && !deleting) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg">Loading team members...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-6 pt-4 poppins">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight poppins-bold">
            Team
          </h2>
          <p className="text-muted-foreground">
            Manage all team members and their details
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Create Button */}
          <Button
            variant="default"
            size="sm"
            onClick={handleCreateMember}
            className="poppins-semibold bg-black hover:bg-black/80"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Team Member
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
            placeholder="Search by name, email, phone, or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredTeam.length} of {team.length} team members
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
                      Phone
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold poppins-semibold whitespace-nowrap">
                      Role
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold poppins-semibold whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedTeam.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-8 text-center text-sm text-muted-foreground"
                      >
                        No team members found
                      </td>
                    </tr>
                  ) : (
                    paginatedTeam.map((member) => (
                      <tr
                        key={member.userId}
                        className="border-b hover:bg-muted/50 transition-colors cursor-pointer"
                        onClick={() => handleViewMember(member)}
                      >
                        <td className="px-4 py-3 text-sm font-medium">
                          <div className="flex items-center gap-2">
                            {member.avatar && (
                              <img
                                src={member.avatar}
                                alt={member.name}
                                className="w-8 h-8 rounded-full object-cover"
                              />
                            )}
                            <span>{member.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">{member.email}</td>
                        <td className="px-4 py-3 text-sm">{member.phone}</td>
                        <td className="px-4 py-3 text-sm">
                          <Badge variant={member.role === "admin" ? "default" : "secondary"} className="text-xs">
                            {member.role}
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
                                  handleEditMember(member);
                                }}
                                disabled={deleting}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteClick(member);
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
          {filteredTeam.length === 0 ? (
            <div className="col-span-full text-center py-8 text-muted-foreground">
              No team members found
            </div>
          ) : (
            filteredTeam.map((member) => (
              <Card
                key={member.userId}
                className="flex flex-col cursor-pointer hover:border-primary transition-colors overflow-hidden pt-0"
                onClick={() => handleViewMember(member)}
              >
                {member.avatar && (
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg poppins-semibold">
                        {member.name}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {member.email}
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
                            handleEditMember(member);
                          }}
                          disabled={deleting}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(member);
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
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Phone:</span>
                    <span className="text-sm">{member.phone}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Role:</span>
                    <Badge variant={member.role === "admin" ? "default" : "secondary"} className="text-xs">
                      {member.role}
                    </Badge>
                  </div>
                  {member.age && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Age:</span>
                      <span className="text-sm">{member.age}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Team Member Modal */}
      <TeamMemberModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveMember}
        member={selectedMember}
        isEdit={isEditMode}
        updating={updating}
      />

      {/* Team Member Details Modal */}
      <TeamMemberDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        member={selectedMember}
        onEdit={handleEditMember}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Delete Team Member"
        description={`Are you sure you want to delete ${memberToDelete?.name}? This action cannot be undone.`}
        loading={deleting}
      />
    </div>
  );
};

export default Team;
