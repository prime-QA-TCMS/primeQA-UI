import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import { GenericTabsProps } from './types';

const GenericTabs: React.FC<GenericTabsProps> = ({ tabsData }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs value={activeTab} onChange={handleChange} centered>
                {tabsData.map((tab, index) => (<Tab key={index} label={tab.label} />))}
            </Tabs>

            <Box sx={{ padding: '20px', marginTop: '10px' }}>
                {tabsData.map((tab, index) => (
                    <div key={index} hidden={activeTab !== index}>
                        {activeTab === index && (<Typography>{tab.content}</Typography>)}
                    </div>
                ))}
            </Box>
        </Box>
    );
};

export default GenericTabs;
