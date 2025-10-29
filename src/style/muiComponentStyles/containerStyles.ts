import { Theme } from '@mui/material/styles';

const drawerWidth = 300;

export const loginContainer = (theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4),
    boxShadow: theme.shadows[2],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100%',
  },
});

export const pageContainer = (theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0),
    boxShadow: theme.shadows[2],
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'left',
    minHeight: '100vh',
    minWidth: '100%',
  },
});

export const contentContainer = (theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0),
    boxShadow: theme.shadows[2],
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'left',
    minHeight: '100vh',
    minWidth: '100%',
  },
});
export const wrapContainer = (theme: Theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    gap: theme.spacing(1), // Optional spacing
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
  },
});


export const DrawerContainer = (theme: Theme) => ({
  root: {
    width: drawerWidth, 
    flexShrink: 0, 
    '& .MuiDrawer-paper': { 
      width: drawerWidth, 
      boxSizing: 'border-box' 
    }
  },
});

export const halfScreenContainer = (theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    boxShadow: theme.shadows[2],
    width: '48%', // keep this
    display: 'flex',
    flexDirection: 'column',
    borderRadius: theme.shape.borderRadius,
  },
});