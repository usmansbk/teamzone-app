import { Grid, Tab, Tabs } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import Profile from "./Profile";
import CreatedTeams from "./Teams";

function a11yProps(tab: string) {
  return {
    id: `horizontal-tab-${tab}`,
    "aria-controls": `horizontal-tabpanel-${tab}`,
  };
}

const tabsMap = {
  profile: {
    index: 0,
    component: <Profile />,
    name: "Profile",
    path: "profile",
  },
  teams: {
    index: 1,
    component: <CreatedTeams />,
    name: "Teams",
    path: "teams",
  },
};

const tabs = Object.values(tabsMap);

export default function Settings() {
  const [q] = useSearchParams();
  const value = (q.get("tab") || "profile") as keyof typeof tabsMap;

  const selectedTab = tabsMap[value];

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={6}>
        <Tabs
          variant="scrollable"
          value={selectedTab.index}
          aria-label="Settings tabs"
        >
          {tabs.map(({ path, name }) => (
            <Tab
              label={name}
              {...a11yProps(path)}
              component={Link}
              to={`?tab=${path}`}
            />
          ))}
        </Tabs>
        {tabs.map(({ path, component }) => value === path && component)}
      </Grid>
    </Grid>
  );
}
