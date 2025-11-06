import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  useTheme,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Collapse,
  Paper,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { contentContainer } from "../../../style/muiComponentStyles/containerStyles";
import { useSections, useTestcases } from "../../../hooks/useTestCases";
import { Section, TestCase } from "../../../types";
import { useParams } from "react-router-dom";

const ProjectSuiteView: React.FC = () => {
  const theme = useTheme();
  const styles = contentContainer(theme);
  const { suiteId } = useParams<{ suiteId: string }>();

  // ✅ Local state to store fetched data once
  const [sectionsData, setSectionsData] = useState<Section[]>([]);
  const [testcasesData, setTestcasesData] = useState<TestCase[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const {
    data: sections,
    loading: secLoading,
    error: secError,
  } = useSections(suiteId || "notFound");

  const {
    data: testcases,
    loading: tcLoading,
    error: tcError,
  } = useTestcases(suiteId || "notFound");

  const loading = secLoading || tcLoading;
  const error = secError || tcError;

  const [openSection, setOpenSection] = useState<string | null>(null);

  // ✅ Only store data once after first successful load
  useEffect(() => {
    if (!dataLoaded && !loading && sections?.length && testcases?.length) {
      setSectionsData(sections);
      setTestcasesData(testcases);
      setDataLoaded(true);
    }
  }, [loading, sections, testcases, dataLoaded]);

  // ✅ Loading
  if (!dataLoaded && loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
        <Typography variant="body2" sx={{ mt: 1 }}>
          Loading suite data...
        </Typography>
      </Box>
    );
  }

  // ✅ Error
  if (error) {
    return (
      <Typography color="error" sx={{ mt: 2 }}>
        Failed to load suite data. {error}
      </Typography>
    );
  }

  // ✅ No data
  if (!sectionsData?.length) {
    return <Typography sx={{ mt: 2 }}>No sections found for this suite.</Typography>;
  }

  const suiteSections = sectionsData.filter(
    (section: Section) => section.suiteId === suiteId
  );

  return (
    <Container sx={styles.root}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Suite Sections
        </Typography>

        <TableContainer component={Paper}>
          <Table aria-label="sections table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Section Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="center">Test Case Count</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {suiteSections.map((section: Section) => {
                const sectionCases = testcasesData?.filter(
                  (tc: TestCase) => tc.sectionId === section._id
                );
                const isOpen = openSection === section._id;

                return (
                  <React.Fragment key={section._id}>
                    {/* Main Row */}
                    <TableRow
                      hover
                      sx={{ cursor: "pointer" }}
                      onClick={() =>
                        setOpenSection(isOpen ? null : section._id)
                      }
                    >
                      <TableCell width="5%">
                        <IconButton size="small">
                          {isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </IconButton>
                      </TableCell>
                      <TableCell>{section.name}</TableCell>
                      <TableCell>{section.description || "—"}</TableCell>
                      <TableCell align="center">
                        {sectionCases?.length || 0}
                      </TableCell>
                    </TableRow>

                    {/* Expandable Row */}
                    <TableRow>
                      <TableCell
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                        colSpan={4}
                      >
                        <Collapse in={isOpen} timeout="auto" unmountOnExit>
                          <Box sx={{ margin: 2 }}>
                            <Typography variant="subtitle1" gutterBottom>
                              Test Cases
                            </Typography>

                            {sectionCases && sectionCases.length > 0 ? (
                              <Table size="small" aria-label="test cases">
                                <TableHead>
                                  <TableRow>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Status</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {sectionCases.map((test: TestCase) => (
                                    <TableRow key={test._id}>
                                      <TableCell>{test.title}</TableCell>
                                      <TableCell>
                                        {test.description || "—"}
                                      </TableCell>
                                      <TableCell>
                                        {"Not Set"}
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            ) : (
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ ml: 2 }}
                              >
                                No test cases found for this section.
                              </Typography>
                            )}
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default ProjectSuiteView;
