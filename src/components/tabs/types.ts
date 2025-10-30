
// Define the structure for the tabs data
export interface TabData {
    label: string;
    content: React.ReactNode;
}

// Define props for the generic component
export interface GenericTabsProps {
    tabsData: TabData[];
}