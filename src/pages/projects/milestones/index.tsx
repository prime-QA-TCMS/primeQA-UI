import React from 'react';
import { Container, useTheme } from '@mui/material';
import { contentContainer } from '../../../style/muiComponentStyles/containerStyles';
import CardListContainer, { CardItem } from '../../../components/cards/CardListContainer';
import GenericPieChart from '../../../components/charts/pieChart/GenericPieChart';
import { chartData } from '../../../components/charts/pieChart/type';

const MilestonesDashboard: React.FC = () => {
    const theme = useTheme();
    const styles = contentContainer(theme);

    const MilestoneGraph: React.FC<any> = ({ passed, failed, blocked, untested }) => {

        const chartContents: chartData[] = [
            {status: "Passed", count: passed, percentage: 0, color: "#4CAF50", },
            {status: "Failed", count: failed, percentage: 0, color: "#E91E63", },
            {status: "Blocked", count: blocked, percentage: 0, color: "#FFC107", },
            {status: "Untested", count: untested, percentage: 0, color: "#757575", },
        ]

        return (
        <GenericPieChart title={"Overview"} data={chartContents}/>
    )
    } ;
    const cardData: CardItem[] = [
        {
            id: 1,
            title: "Milestone 1",
            description: "Milestone 1 Description",
            component: <MilestoneGraph passed={10} failed={2} blocked={1} untested={6} />,
            onViewClick: () => {}
        },
        {
            id: 2,
            title: "Milestone 2",
            description: "Milestone 2 Description",
            component: <MilestoneGraph passed={10} failed={2} blocked={1} untested={6} />,
            onViewClick: () => {}
        },
        {
            id: 3,
            title: "Milestone 3",
            description: "Milestone 3 Description",
            component: <MilestoneGraph passed={10} failed={2} blocked={1} untested={6} />,
            onViewClick: () => {}
        },
        {
            id: 4,
            title: "Milestone 4",
            description: "Milestone 4 Description",
            component: <MilestoneGraph passed={10} failed={2} blocked={1} untested={6} />,
            onViewClick: () => {}
        },
        {
            id: 5,
            title: "Milestone 5",
            description: "Milestone 5 Description",
            component: <MilestoneGraph passed={10} failed={2} blocked={1} untested={6} />,
            onViewClick: () => {}
        },
        {
            id: 1,
            title: "Milestone 6",
            description: "Milestone 6 Description",
            component: <MilestoneGraph passed={10} failed={2} blocked={1} untested={6} />,
            onViewClick: () => {}
        }
    ]

    return (
        <Container sx={styles.root}>
            <CardListContainer cards={cardData} />
        </Container>
    );
};

export default MilestonesDashboard;
