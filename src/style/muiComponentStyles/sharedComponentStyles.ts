import { Theme } from '@mui/material/styles';

export const metricCardComponentStyle = (theme: Theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "stretch",
    gap: theme.spacing(2),
    width: "100%",
    padding: theme.spacing(2),

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
      gap: theme.spacing(1),
    },
  },

  card: {
    flex: "1 1 18rem",
    minWidth: "15rem",
    maxWidth: "22rem",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
