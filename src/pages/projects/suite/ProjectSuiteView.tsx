import React from "react";
import { Box, Container, Typography, useTheme } from "@mui/material";
import AccordionList, { AccordionItem } from "../../../components/lists/AccordionList";
import GenericForm from "../../../components/forms/Form";
import { useJsonData } from "../../../utils/useJsonData";
import { Section } from "../../../types/database/Suites";
import { TestCase } from "../../../types/database/TestCase";
import { casesFormFields } from "../../../Forms/TestCaseManagement";
import { contentContainer } from "../../../style/muiComponentStyles/containerStyles";

const ProjectSuiteView: React.FC = () => {
    const theme = useTheme();
    const styles = contentContainer(theme);
  const suiteId = localStorage.getItem("suiteId") || "";

  const { data: testCases, loading: tcLoading, error: tcError } = useJsonData<TestCase[]>("/mock-data/testcases.json");
  const { data: sections, loading: secLoading, error: secError } = useJsonData<Section[]>("/mock-data/sections.json");

  if (tcLoading || secLoading) return <p>Loading...</p>;
  if (tcError || secError) return <p style={{ color: "red" }}>Error loading data.</p>;
  if (!sections || !testCases) return <p>No data found.</p>;

  const suiteSections = sections.filter((sec) => sec.suiteId === suiteId);

  const sectionAccordions: AccordionItem[] = suiteSections.map((section, index) => {
    const sectionCases = testCases.filter((tc) => tc.sectionId === section._id && tc.suiteId === suiteId);

    return {
      id: index + 1,
      title: section.name + " (Case Count: " + sectionCases.length + ") ",
      percentage: null,
      component: (
        <AccordionList
          items={sectionCases.map((test, idx) => ({
            id: idx + test._id,
            title: test.title,
            percentage: null,
            component: (
              <GenericForm
                initialValues={test}
                fields={casesFormFields}
                onSubmit={(data) => console.log(`Saved ${test.title}:`, data)}
                submitButtonText="Save"
              />
            ),
          }))}
        />
      ),
    };
  });

  return (
    <Container sx={styles.root}>
      <Box sx={{ p: 3 }}>
        {sectionAccordions.length > 0 ? (
          <AccordionList items={sectionAccordions} />
        ) : (
          <Typography>No sections found for this suite.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default ProjectSuiteView;
