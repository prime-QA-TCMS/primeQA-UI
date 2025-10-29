import React from 'react';
import { Container } from '@mui/material';
import AccordionList from '../../components/lists/AccordionList';
import { suiteAccordionData } from '../../mock-data/suites';

const ProjectSuite: React.FC = () => {
    return (
        <Container>
            <AccordionList items={suiteAccordionData} />
        </Container>
    );
};

export default ProjectSuite;
