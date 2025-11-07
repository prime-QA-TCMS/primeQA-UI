import React, { useState, useEffect } from "react";
import {Box, Toolbar, Typography, Drawer, List, ListItem, ListItemButton, ListItemText, useTheme, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Topbar from "./Topbar";
import { MenuItem } from "./types";
import { pageContainer, DrawerContainer } from "../../style/muiComponentStyles/containerStyles";
import GenericForm from "../forms/Form";
import { FormField } from "../forms/types";
import { useResolvedMenu } from "../../hooks/useResolvedMenu"; // ✅ NEW

interface PageWrapperProps {
  children: React.ReactNode;
  menuItems: Record<string, MenuItem[]>;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children, menuItems }) => {
  const theme = useTheme();
  const styles = pageContainer(theme);
  const drawerStyles = DrawerContainer(theme);
  const navigate = useNavigate();

  const [pageTitle, setPageTitle] = useState(
    () => localStorage.getItem("pageTitle") || "Projects Overview"
  );

  // ✅ Automatically replace :params with real URL values
  const resolvedMenu = useResolvedMenu(menuItems);

  const handleNavigation = (menu: MenuItem) => {
    setPageTitle(menu.label);
    localStorage.setItem("pageTitle", menu.label);
    navigate(menu.path);
  };

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "pageTitle" && event.newValue) {
        setPageTitle(event.newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const selectProjectFormField: FormField[] = [
    {
      name: "project",
      label: "Project",
      type: "select",
      required: true,
      onChange: (value: string) => console.log(value),
    },
  ];

  return (
    <Box sx={styles.root}>
      <Drawer variant="permanent" sx={drawerStyles.root}>
        <Toolbar>
          <a href="/dashboard">
            <Typography variant="h6">PRIMEQA LOGO</Typography>
          </a>
        </Toolbar>

        <List>
          {Object.entries(resolvedMenu).map(([section, items], sectionIndex) => (
            <Box key={sectionIndex} sx={{ mb: 2 }}>
              <Typography>{section}</Typography>
              {items.map((menu: MenuItem, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton onClick={() => handleNavigation(menu)} sx={{ pl: 4 }}>
                    <ListItemText primary={menu.label} />
                  </ListItemButton>
                </ListItem>
              ))}
            </Box>
          ))}
        </List>

        <Box sx={{ flexGrow: 1 }} />
        <GenericForm fields={selectProjectFormField} />
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 0, marginTop: "80px" }}>
        <Topbar pageTitle={pageTitle} />
        <Box sx={{ flexGrow: 1, p: 0, marginTop: "0px" }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default PageWrapper;
