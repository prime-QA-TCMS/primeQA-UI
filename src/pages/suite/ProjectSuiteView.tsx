import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { dummySuiteData } from '../../mock-data/suites';
import GenericForm from '../../components/forms/Form';
import AccordionList from '../../components/lists/AccordionList';

const ProjectSuiteView: React.FC = () => {

    const suiteIndex = Number(localStorage.getItem('suiteId')) || 0;
    const suite = dummySuiteData[suiteIndex];

//<AccordionList items={sections} />
        const sections = suite.sections.map((section) => ({
            id: section.id,
            title: section.sectionName,
            percentage: null, // optional placeholder
            component: (
                <AccordionList
                    items={section.testCases.map((test) => ({
                        id: test.id,
                        title: test.name,
                        percentage: null,
                        component: (
                            <GenericForm
                                initialValues={test}
                                fields={[
                                    { name: 'name', label: 'Name', type: 'text'},
                                    { name: 'preconditions', label: 'preconditions', type: 'text' },
                                    { name: 'steps', label: 'Steps', type: 'text' },
                                    { name: 'expectedResults', label: 'Expected Results', type: 'text' },
                                ]}
                                onSubmit={(data) => console.log(`Form data for ${test.name}:`, data)}
                                submitButtonText="Save"
                            />
                        ),
                    }))}
                />
            ),
        }));
  
    return (
        <Container>
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {suite.name}
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
        {suite.description}
      </Typography>

      <AccordionList items={sections} />
    </Box>
        </Container>
    );
};

export default ProjectSuiteView;
