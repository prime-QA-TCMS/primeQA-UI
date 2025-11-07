export interface TabData {
    label: string;
    content: React.ReactNode;
}

export interface GenericTabsProps {
    tabsData: TabData[];
}