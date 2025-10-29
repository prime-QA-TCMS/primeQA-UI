import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';

// Define the structure for the tabs data
interface TabData {
    label: string;
    content: React.ReactNode;
}

// Define props for the generic component
interface GenericTabsProps {
    tabsData: TabData[];
}

const GenericTabs: React.FC<GenericTabsProps> = ({ tabsData }) => {
    const [activeTab, setActiveTab] = useState(0);

    // Handle tab change
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            {/* MUI Tabs */}
            <Tabs value={activeTab} onChange={handleChange} centered>
                {tabsData.map((tab, index) => (
                    <Tab key={index} label={tab.label} />
                ))}
            </Tabs>

            {/* Content Section */}
            <Box sx={{ padding: '20px', marginTop: '10px' }}>
                {tabsData.map((tab, index) => (
                    <div key={index} hidden={activeTab !== index}>
                        {activeTab === index && (
                            <Typography>{tab.content}</Typography>
                        )}
                    </div>
                ))}
            </Box>
        </Box>
    );
};

export default GenericTabs;
