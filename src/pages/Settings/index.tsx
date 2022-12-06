import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Profile from "./Profile";
import CreatedTeams from "./Teams";

interface TabPanelProps extends React.PropsWithChildren {
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function Settings() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        bgcolor: "background.paper",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Tabs
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Settings tabs"
      >
        <Tab label="Profile" {...a11yProps(0)} />
        <Tab label="Teams" {...a11yProps(1)} />
      </Tabs>
      <Box sx={{ width: "100%" }}>
        <TabPanel value={value} index={0}>
          <Profile />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CreatedTeams />
        </TabPanel>
      </Box>
    </Box>
  );
}