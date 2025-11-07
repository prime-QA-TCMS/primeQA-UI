import React, { useState } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { SuiteListItemProps } from "./types";
import { Suite, Section, TestCase } from "../../../../types";
import { useSuites, useSections, useTestcases, useCreateSuite } from "../../../../hooks/useTestCases";
import { RocketLaunchOutlined } from "@mui/icons-material";
import GenericList, { ListItemData } from "../../../../components/lists/List";
import { suitesFormFields } from "../../../../Forms/TestCaseManagement";
import PopUpForm from "../../../../components/forms/PopUpForm";

const RecordListItem: React.FC<SuiteListItemProps> = ({ recordObject, projectId }) => {
  const navigate = useNavigate();

  // ✅ Fetch sections and testcases for this suite from the backend
  const { data: suiteSections, loading: sectionsLoading, error: sectionsError } = useSections(recordObject._id);
  const { data: testcases, loading: casesLoading, error: casesError } = useTestcases(recordObject._id);

  // ✅ Unified loading/error handling
  if (sectionsLoading || casesLoading) {
    return (
      <Box sx={{ textAlign: "center", mt: 2 }}>
        <CircularProgress size={24} />
        <Typography variant="body2">Loading suite details...</Typography>
      </Box>
    );
  }

  if (sectionsError || casesError) {
    return (
      <Typography color="error" sx={{ mt: 1 }}>
        Failed to load suite details. {sectionsError || casesError}
      </Typography>
    );
  }

  // ✅ Fallback if no data
  if (!suiteSections?.length && !testcases?.length) {
    return <Typography>No sections or test cases found for this suite.</Typography>;
  }

  // ✅ Filter only relevant sections/testcases
  const suiteSectionsFiltered = suiteSections?.filter(
    (sec: Section) => sec.projectId === projectId && sec.suiteId === recordObject._id
  );
  const suiteTestcasesFiltered = testcases?.filter(
    (tc: TestCase) => tc.suiteId === recordObject._id
  );

  // ✅ Handle navigation and set suite context
  const handleNavigation = () => {
    try {
      localStorage.setItem("pageTitle", recordObject.name);
      localStorage.setItem("suiteId", recordObject._id);

      // trigger page title update
      globalThis.dispatchEvent(new StorageEvent("storage", { key: "pageTitle", newValue: recordObject.name }));
      globalThis.dispatchEvent(new StorageEvent("storage", { key: "suiteId", newValue: recordObject._id }));

      navigate(`/project/${projectId}/suite/${recordObject._id}`);
    } catch (error) {
      console.error("Error during navigation:", error);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="body2">
        <b>Total Cases:</b> {suiteTestcasesFiltered?.length ?? 0}
        <br />
        <b>Total Sections:</b> {suiteSectionsFiltered?.length ?? 0}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 1 }}
        onClick={handleNavigation}
      >
        View Suite
      </Button>
    </Box>
  );
};

export const SuiteListView: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { data: suites, loading, error } = useSuites();

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
        <Typography variant="body2" sx={{ mt: 1 }}>
          Loading suites...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ mt: 2 }}>
        Failed to load suites. {error}
      </Typography>
    );
  }

  if (!suites?.length) {
    return <Typography>No suites found for this project.</Typography>;
  }

  // ✅ Filter out archived and unrelated suites
  const projectSuites = suites.filter(
    (s: Suite) => s.projectId === projectId && !s.isArchived
  );

  const accordionItems: ListItemData[] = projectSuites.map((suite: Suite) => ({
      id: suite._id,
      title: `${suite.name}`,
      icon: <RocketLaunchOutlined />,
      link: `/project/${projectId}/suite/${suite._id}`,
  }));


  return (<GenericList items={accordionItems} />);
};

export default SuiteListView;