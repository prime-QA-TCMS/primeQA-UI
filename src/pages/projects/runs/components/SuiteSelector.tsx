import React, { useEffect, useState } from "react";
import { Container, Typography, MenuItem, Select, FormControl, InputLabel, CircularProgress, List, ListItemButton, ListItemText, Divider, Box, Button, Checkbox, ListItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { ResultsAPI, TestcaseAPI } from "../../../../api";
import { contentContainer } from "../../../../style/muiComponentStyles/containerStyles";
import { Suite, Section, TestCase, Test } from "../../../../types";

const SuiteSelector: React.FC = () => {
  const theme = useTheme();
  const styles = contentContainer(theme);
  const { projectId } = useParams<{ projectId: string }>();

  // 🧩 State Management
  const [loadingSuites, setLoadingSuites] = useState(false);
  const [loadingSections, setLoadingSections] = useState(false);
  const [loadingCases, setLoadingCases] = useState(false);
  const [creatingRun, setCreatingRun] = useState(false);

  const [suites, setSuites] = useState<Suite[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [testCases, setTestCases] = useState<TestCase[]>([]);

  const [selectedSuite, setSelectedSuite] = useState<string>("");
  const [selectedSection, setSelectedSection] = useState<string>("");

  // ✅ Selection tracking: { sectionId: string, testcaseIds: string[] }[]
  const [selectedMap, setSelectedMap] = useState<
    { sectionId: string; testcaseIds: string[] }[]
  >([]);

  // 🟦 Fetch Suites
  useEffect(() => {
    const fetchSuites = async () => {
      if (!projectId) return;
      setLoadingSuites(true);
      try {
        const suites = await TestcaseAPI.suiteGetAll();
        setSuites(Array.isArray(suites) ? suites : []);
      } catch (err) {
        console.error("❌ Failed to fetch suites:", err);
      } finally {
        setLoadingSuites(false);
      }
    };
    fetchSuites();
  }, [projectId]);

  // 🟩 Fetch Sections
  useEffect(() => {
    const fetchSections = async () => {
      if (!selectedSuite) return;
      setLoadingSections(true);
      setSections([]);
      setTestCases([]);
      setSelectedSection("");
      try {
        const sections = await TestcaseAPI.sectionGetAll(selectedSuite);
        setSections(Array.isArray(sections) ? sections : []);
      } catch (err) {
        console.error("❌ Failed to fetch sections:", err);
      } finally {
        setLoadingSections(false);
      }
    };
    fetchSections();
  }, [selectedSuite]);

  // 🟨 Fetch Test Cases
  const handleSectionClick = async (sectionId: string) => {
    setSelectedSection(sectionId);
    setLoadingCases(true);
    setTestCases([]);
    try {
      const cases = await TestcaseAPI.testcaseGetAll(sectionId);
      setTestCases(Array.isArray(cases) ? cases : []);
    } catch (err) {
      console.error("❌ Failed to fetch test cases:", err);
    } finally {
      setLoadingCases(false);
    }
  };

  // 🧠 Handle Individual Test Case Checkbox
  const handleTestCaseToggle = (sectionId: string, testCaseId: string, checked: boolean) => {
    setSelectedMap((prev) => {
      const existing = prev.find((s) => s.sectionId === sectionId);
      if (existing) {
        const updatedIds = checked
          ? Array.from(new Set([...existing.testcaseIds, testCaseId]))
          : existing.testcaseIds.filter((id) => id !== testCaseId);
        return prev.map((s) =>
          s.sectionId === sectionId ? { ...s, testcaseIds: updatedIds } : s
        );
      } else {
        return checked ? [...prev, { sectionId, testcaseIds: [testCaseId] }] : prev;
      }
    });
  };

  // 🧠 Handle “Select All” for a Section
  const handleSelectAll = (sectionId: string, checked: boolean) => {
    const sectionCaseIds = testCases.map((tc) => tc._id);
    setSelectedMap((prev) => {
      const existing = prev.find((s) => s.sectionId === sectionId);
      if (checked) {
        if (existing) {
          return prev.map((s) =>
            s.sectionId === sectionId ? { ...s, testcaseIds: sectionCaseIds } : s
          );
        } else {
          return [...prev, { sectionId, testcaseIds: sectionCaseIds }];
        }
      } else {
        return prev.filter((s) => s.sectionId !== sectionId);
      }
    });
  };

  // ✅ Get selected state helpers
  const isTestCaseSelected = (sectionId: string, testCaseId: string) =>
    selectedMap.find((s) => s.sectionId === sectionId)?.testcaseIds.includes(testCaseId) || false;

  const areAllSelected =
    testCases.length > 0 &&
    testCases.every((tc) => isTestCaseSelected(selectedSection, tc._id));

  // 🟢 Save Action → Create Run → Send Tests
const handleSave = async () => {
  if (!projectId || !selectedSuite || selectedMap.length === 0) return;

  try {
    setCreatingRun(true);

    // ✅ Step 1: Create Run (allow optional suiteId)
    const createdRun = await ResultsAPI.runCreate({
      projectId,
      name: `Run - ${new Date().toLocaleString()}`,
      status: "Pending",
      // @ts-expect-error Allow suiteId to be attached (not part of type)
      suiteId: selectedSuite,
    });

    const runId = createdRun?.data?._id || "";
    if (!runId) throw new Error("Failed to create run.");

    // ✅ Step 2: Build payload (use Partial<Test> for flexibility)
    const payload: Partial<Test>[] = selectedMap.flatMap((sectionItem) => {
      const testCasesForSection = testCases.filter((tc) =>
        sectionItem.testcaseIds.includes(tc._id)
      );
      return testCasesForSection.map((tc) => ({
        projectId,
        runId,
        suiteId: selectedSuite,
        sectionId: sectionItem.sectionId,
        testCaseId: tc._id,
        title: tc.title,
        isActive: true,
      }));
    });

    console.log("🚀 Sending Payload:", payload);

    // ✅ Step 3: Send to backend
    // Adjust ResultsAPI.testCreate type to accept Partial<Test>[]
    const response = await ResultsAPI.testCreate(payload as any);
    console.log("✅ Tests Created:", response);

    alert(`Successfully created ${payload.length} test records!`);
  } catch (err: any) {
    console.error("❌ Error creating run or tests:", err);
    alert("Failed to create run or test records.");
  } finally {
    setCreatingRun(false);
  }
};


  return (
    <Container sx={styles.root}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Test Suite Explorer
      </Typography>

      {/* 🧩 Suite Dropdown */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Test Suite</InputLabel>
        <Select
          value={selectedSuite}
          onChange={(e) => setSelectedSuite(e.target.value)}
          disabled={loadingSuites}
        >
          {loadingSuites ? (
            <MenuItem disabled>Loading suites...</MenuItem>
          ) : suites.length === 0 ? (
            <MenuItem disabled>No suites found</MenuItem>
          ) : (
            suites.map((suite) => (
              <MenuItem key={suite._id} value={suite._id}>
                {suite.name}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>

      <Box sx={{ display: "flex", gap: 4 }}>
        {/* 🟦 LEFT: Sections */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6">Sections</Typography>
          {loadingSections ? (
            <CircularProgress />
          ) : (
            <List>
              {sections.length === 0 ? (
                <ListItemText primary="No sections found." />
              ) : (
                sections.map((section) => (
                  <React.Fragment key={section._id}>
                    <ListItemButton
                      selected={selectedSection === section._id}
                      onClick={() => handleSectionClick(section._id)}
                    >
                      <ListItemText
                        primary={section.name}
                        secondary={section.description}
                      />
                    </ListItemButton>
                    <Divider />
                  </React.Fragment>
                ))
              )}
            </List>
          )}
        </Box>

        {/* 🟩 RIGHT: Test Cases */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6">Test Cases</Typography>
          {loadingCases ? (
            <CircularProgress />
          ) : !selectedSection ? (
            <Typography>Select a section to view test cases.</Typography>
          ) : testCases.length === 0 ? (
            <Typography>No test cases found.</Typography>
          ) : (
            <List>
              <ListItem>
                <Checkbox
                  checked={areAllSelected}
                  onChange={(e) => handleSelectAll(selectedSection, e.target.checked)}
                />
                <ListItemText primary="Select All" />
              </ListItem>
              <Divider />
              {testCases.map((tc) => (
                <ListItem key={tc._id}>
                  <Checkbox
                    checked={isTestCaseSelected(selectedSection, tc._id)}
                    onChange={(e) =>
                      handleTestCaseToggle(selectedSection, tc._id, e.target.checked)
                    }
                  />
                  <ListItemText
                    primary={tc.title}
                    secondary={`Priority: ${tc.priority} | Type: ${tc.type}`}
                  />
                </ListItem>
              ))}
            </List>
          )}

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={selectedMap.length === 0 || creatingRun}
            onClick={handleSave}
          >
            {creatingRun ? "Creating..." : "Save Selection"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SuiteSelector;
