import React, { useCallback, useMemo, useState } from "react";
import { Box, Container, Typography, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { contentContainer } from "../../../style/muiComponentStyles/containerStyles";
import {
  useCreateSection,
  useCreateTestcase,
  useSections,
  useSuiteById,
} from "../../../hooks/useTestCases";
import { Section, TestCase } from "../../../types";
import { TestcaseAPI } from "../../../api";
import { DataTable } from "../../../components/table/DataTable";
import { Column, NestedConfig } from "../../../components/table/types";
import PopUpForm from "../../../components/forms/PopUpForm";
import {
  sectionsFormFields,
  testCaseFormFields,
} from "../../../Forms/TestCaseManagement";

const ProjectSuiteView: React.FC = () => {
  const theme = useTheme();
  const styles = contentContainer(theme);

  const { projectId, suiteId } = useParams<{ projectId: string; suiteId: string }>();
  const [testcasesMap, setTestcasesMap] = useState<Record<string, TestCase[]>>({});
  const [loadingSections, setLoadingSections] = useState<Record<string, boolean>>({});
  const fetchedSectionsRef = React.useRef<Set<string>>(new Set()); // ✅ to prevent re-fetches

  const { data, loading, error } = useSuiteById(suiteId || "notfound");
  const {
    data: sections,
    loading: sectionsLoading,
    error: sectionsError,
    refetch,
  } = useSections(suiteId || "notFound");

  const { createSection } = useCreateSection();

  const fetchTestCases = useCallback(async (sectionId: string) => {
    // ✅ stop if already fetched
    if (fetchedSectionsRef.current.has(sectionId)) return;
    fetchedSectionsRef.current.add(sectionId);

    setLoadingSections((prev) => ({ ...prev, [sectionId]: true }));
    try {
      const data = await TestcaseAPI.testcaseGetAll(sectionId);
      if (Array.isArray(data)) {
        setTestcasesMap((prev) => ({ ...prev, [sectionId]: data }));
      }
    } catch (err) {
      console.error(`❌ Failed to fetch test cases for section ${sectionId}:`, err);
    } finally {
      setLoadingSections((prev) => ({ ...prev, [sectionId]: false }));
    }
  }, []);

  const projectSections = (sections || []).filter(
    (section: Section) => section.suiteId === suiteId
  );

  const handleCreateSave = async (formData: any) => {
    try {
      const response = await createSection(formData);
      if (response) {
        console.log("✅ Section created successfully:", response);
        await refetch(suiteId);
      }
      return response;
    } catch (err) {
      console.error("❌ Error creating section:", err);
      return null;
    }
  };

  const sectionColumns: Column<Section>[] = [
    { key: "name", label: "Section Name" },
    { key: "description", label: "Description" },
    {
      key: "count",
      label: "Test Case Count",
      align: "center",
      render: (item) => testcasesMap[item._id]?.length || 0,
    },
  ];

  const dynamicNestedConfig = useMemo<NestedConfig<Section>>(
    () => ({
      getNestedData: (section) => testcasesMap[section._id] || [],
      nestedColumns: [
        { key: "title", label: "Title" },
        { key: "priority", label: "Priority" },
        { key: "type", label: "Type" },
        { key: "preconditions", label: "Preconditions" },
        { key: "steps", label: "Steps" },
        { key: "expectedResult", label: "Expected Result" },
        { key: "isActive", label: "is Active"},
        { key: "status", label: "status"},
      ],
      loading: Object.values(loadingSections).some(Boolean),
    }),
    [testcasesMap, loadingSections]
  );

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
        <Typography variant="body2" sx={{ mt: 1 }}>
          Loading test suite...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ mt: 2 }}>
        Failed to load test suite. {error}
      </Typography>
    );
  }

  if (!data) {
    return <Typography>No test suite found for this project.</Typography>;
  }

  return (
    <Container sx={styles.root}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          {data.name}
        </Typography>

        <PopUpForm
          suitesFormFields={sectionsFormFields(projectId, suiteId)}
          onSubmit={handleCreateSave}
          submitText="Save Section"
          buttonText="Add Section"
          title="Create New Section"
        />

        <DataTable<Section>
          title="Sections"
          data={projectSections}
          columns={sectionColumns}
          loading={sectionsLoading}
          nestedConfig={dynamicNestedConfig}
          emptyMessage="No sections available."
          onRowExpand={(section) => fetchTestCases(section._id)} // ✅ now stable
          nestedHeaderComponent={(section) => (
            <CreateTestCaseComponent
              projectId={projectId!}
              suiteId={suiteId!}
              sectionId={section._id}
              refetch={() => fetchTestCases(section._id)}
            />
          )}
        />
      </Box>
    </Container>
  );
};

interface CreateTestCaseComponentProps {
  projectId: string;
  suiteId: string;
  sectionId: string;
  refetch: () => Promise<void> | void;
}

const CreateTestCaseComponent: React.FC<CreateTestCaseComponentProps> = ({
  projectId,
  suiteId,
  sectionId,
  refetch,
}) => {
  const { createTestcase } = useCreateTestcase();

  const handleCreateSave = async (formData: any) => {
    try {
      // ✅ Inject IDs before sending to API
      const enrichedData = {
        ...formData,
        projectId,
        suiteId,
        sectionId,
      };

      console.log("🧩 Submitting Test Case Data:", enrichedData);

      const response = await createTestcase(enrichedData);

      if (response) {
        console.log("✅ Test case created successfully:", response);
        await refetch();
      }
    } catch (err) {
      console.error("❌ Error creating test case:", err);
    }
  };

  return (
    <PopUpForm
      suitesFormFields={testCaseFormFields}
      onSubmit={handleCreateSave}
      submitText="Save Test Case"
      buttonText="Add Test Case"
      title="Create New Test Case"
    />
  );
};

export default ProjectSuiteView;
