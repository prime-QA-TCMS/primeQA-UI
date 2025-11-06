import React, { useEffect, useState } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RocketLaunchOutlined } from "@mui/icons-material";

import AccordionList, { AccordionItem } from "../../../../components/lists/AccordionList";
import GenericList, { ListItemData } from "../../../../components/lists/List";
import { ProjectAPI } from "../../../../api";
import { Project } from "../../../../types";

// ---------- Project List Item ----------
interface ProjectListItemProps {
  projectObject: Project;
}

const ProjectListItem: React.FC<ProjectListItemProps> = ({ projectObject }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    if (!projectObject._id) return;

    localStorage.setItem("pageTitle", projectObject.name);
    localStorage.setItem("projectId", projectObject._id);

    // Sync state across tabs
    globalThis.dispatchEvent(new StorageEvent("storage", { key: "pageTitle", newValue: projectObject.name }));
    globalThis.dispatchEvent(new StorageEvent("storage", { key: "projectId", newValue: projectObject._id }));

    navigate(`/project/${projectObject._id}`);
  };

  return (
    <Box sx={{ padding: 1 }}>
      <Typography variant="body2">
        <b>Description:</b> {projectObject.description || "No description"}
      </Typography>
      <Typography variant="body2">
        <b>Visibility:</b> {projectObject.visibility || "N/A"}
      </Typography>
      <Typography variant="body2">
        <b>Status:</b> {projectObject.isActive ? "Active" : "Archived"}
      </Typography>

      <Button
        variant="outlined"
        color="primary"
        size="small"
        sx={{ mt: 1 }}
        onClick={handleNavigation}
      >
        View Project
      </Button>
    </Box>
  );
};

// ---------- Project List View ----------
export const ProjectListView: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await ProjectAPI.projectGetAll()
        if (Array.isArray(response)) {
          setProjects(response);
        } else {
          console.warn("Unexpected API response:", response);
          setProjects([]);
        }
      } catch (err: any) {
        console.error("❌ Error loading projects:", err);
        setError("Failed to fetch projects from API");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (loading)
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress size={28} />
        <Typography variant="body2" sx={{ mt: 1 }}>
          Loading projects...
        </Typography>
      </Box>
    );

  if (error)
    return (
      <Typography color="error" sx={{ mt: 2 }}>
        {error}
      </Typography>
    );

  if (!projects.length)
    return (
      <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
        No Projects Found
      </Typography>
    );

  // Separate Active vs Archived
  const activeProjects = projects.filter((p) => p.isActive);
  const archivedProjects = projects.filter((p) => !p.isActive);

  const activeAccordion: AccordionItem[] = activeProjects.map((project) => ({
    id: project._id,
    title: project.name,
    percentage: null,
    component: <ProjectListItem projectObject={project} />,
  }));

  const archivedAccordion: ListItemData[] = archivedProjects.map((project) => ({
    id: project._id,
    title: project.name,
    icon: <RocketLaunchOutlined />,
    link: `/project/${project._id}`,
  }));

  return (
    <>
      {activeAccordion.length > 0 ? (
        <>
          <Typography variant="h6" color="text.secondary">
            Active Projects
          </Typography>
          <AccordionList items={activeAccordion} />
        </>
      ) : (
        <Typography variant="h6" color="text.secondary">
          No Active Projects
        </Typography>
      )}

      {archivedAccordion.length > 0 ? (
        <>
          <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
            Archived Projects
          </Typography>
          <GenericList items={archivedAccordion} />
        </>
      ) : (
        <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
          No Archived Projects
        </Typography>
      )}
    </>
  );
};
