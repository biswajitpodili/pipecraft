import React, { useMemo } from "react";
import useContactContext from "@/context/useContactContext.jsx";
import useProjectsContext from "@/context/useProjectsContext";
import useServicesContext from "@/context/useServicesContext";
import useJobPostingsContext from "@/context/useJobPostingsContext";
import {useTeamContext} from "@/context/useTeamContext";
import {useApplicationsContext} from "@/context/useApplicationsContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Briefcase,
  LayoutGrid,
  UserCheck,
  FileText,
  TrendingUp,
  Mail,
  Phone,
  Building2,
} from "lucide-react";

const Overview = () => {
  const { contacts } = useContactContext();
  const { projects } = useProjectsContext();
  const { services } = useServicesContext();
  const { jobPostings } = useJobPostingsContext();
  const { team } = useTeamContext();
  const { applications } = useApplicationsContext();

  // Calculate statistics
  const stats = useMemo(() => {
    // Contact stats
    const totalContacts = contacts.length;
    const unreadContacts = contacts.filter((c) => !c.read).length;

    // Project stats
    const totalProjects = projects.length;
    const projectsWithImages = projects.filter((p) => p.image).length;

    // Service stats
    const totalServices = services.length;
    const activeServices = services.filter((s) => s.isActive).length;

    // Job posting stats
    const totalJobPostings = jobPostings.length;
    const activeJobPostings = jobPostings.filter((j) => j.isActive).length;

    // Team stats
    const totalTeam = team.length;
    const adminCount = team.filter((t) => t.role === "admin").length;

    // Application stats
    const totalApplications = applications.length;
    const recentApplications = applications.filter((a) => {
      const appDate = new Date(a.appliedAt);
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return appDate >= sevenDaysAgo;
    }).length;

    return {
      contacts: { total: totalContacts, unread: unreadContacts },
      projects: { total: totalProjects, withImages: projectsWithImages },
      services: { total: totalServices, active: activeServices },
      jobPostings: { total: totalJobPostings, active: activeJobPostings },
      team: { total: totalTeam, admins: adminCount },
      applications: { total: totalApplications, recent: recentApplications },
    };
  }, [contacts, projects, services, jobPostings, team, applications]);

  const statCards = [
    {
      title: "Contacts",
      total: stats.contacts.total,
      subtitle: `${stats.contacts.unread} unread`,
      icon: Mail,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Projects",
      total: stats.projects.total,
      subtitle: `${stats.projects.withImages} Completed`,
      icon: Briefcase,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Services",
      total: stats.services.total,
      subtitle: `${stats.services.active} active`,
      icon: LayoutGrid,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Job Postings",
      total: stats.jobPostings.total,
      subtitle: `${stats.jobPostings.active} active`,
      icon: Building2,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Team Members",
      total: stats.team.total,
      subtitle: `${stats.team.admins} admins`,
      icon: Users,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      title: "Applications",
      total: stats.applications.total,
      subtitle: `${stats.applications.recent} this week`,
      icon: FileText,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
    },
  ];

  return (
    <div className="flex-1 space-y-4 p-6 pt-4 poppins">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight poppins-bold">
            Overview
          </h2>
          <p className="text-muted-foreground">
            Dashboard summary and statistics
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:border-primary transition-colors">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground poppins">
                  {stat.title}
                </CardTitle>
                <div className={`${stat.bgColor} p-2 rounded-lg`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold poppins-bold">{stat.total}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.subtitle}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity Summary */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Contacts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base poppins-semibold flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Recent Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            {contacts.slice(0, 5).length === 0 ? (
              <p className="text-sm text-muted-foreground">No contacts yet</p>
            ) : (
              <div className="space-y-2">
                {contacts.slice(0, 5).map((contact) => (
                  <div
                    key={contact.contactId}
                    className="flex items-center justify-between text-sm border-b pb-2 last:border-0"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{contact.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {contact.email}
                      </p>
                    </div>
                    {!contact.read && (
                      <Badge variant="default" className="text-xs ml-2">
                        New
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base poppins-semibold flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Recent Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            {applications.slice(0, 5).length === 0 ? (
              <p className="text-sm text-muted-foreground">No applications yet</p>
            ) : (
              <div className="space-y-2">
                {applications.slice(0, 5).map((application) => (
                  <div
                    key={application.applicationId}
                    className="flex items-center justify-between text-sm border-b pb-2 last:border-0"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{application.applicantName}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {application.applicantEmail}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs ml-2">
                      {application.careerId}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Active Services */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base poppins-semibold flex items-center gap-2">
              <LayoutGrid className="h-4 w-4" />
              Active Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            {services.filter((s) => s.isActive).slice(0, 5).length === 0 ? (
              <p className="text-sm text-muted-foreground">No active services</p>
            ) : (
              <div className="space-y-2">
                {services
                  .filter((s) => s.isActive)
                  .slice(0, 5)
                  .map((service) => (
                    <div
                      key={service.serviceId}
                      className="flex items-center justify-between text-sm border-b pb-2 last:border-0"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{service.title}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {service.features?.length || 0} features
                        </p>
                      </div>
                      <Badge variant="default" className="text-xs ml-2">
                        Active
                      </Badge>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Active Job Postings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base poppins-semibold flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Active Job Postings
            </CardTitle>
          </CardHeader>
          <CardContent>
            {jobPostings.filter((j) => j.isActive).slice(0, 5).length === 0 ? (
              <p className="text-sm text-muted-foreground">No active job postings</p>
            ) : (
              <div className="space-y-2">
                {jobPostings
                  .filter((j) => j.isActive)
                  .slice(0, 5)
                  .map((job) => (
                    <div
                      key={job.careerId}
                      className="flex items-center justify-between text-sm border-b pb-2 last:border-0"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{job.jobTitle}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {job.department} • {job.location}
                        </p>
                      </div>
                      <Badge variant="default" className="text-xs ml-2">
                        Active
                      </Badge>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;