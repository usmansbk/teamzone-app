import { CircularProgress, Grid, Tab, Tabs, Box } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import useMe from "src/hooks/api/useMe";
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
    component: <Profile key="profile" />,
    name: "Profile",
    path: "profile",
  },
  teams: {
    index: 1,
    component: <CreatedTeams key="teams" />,
    name: "Teams",
    path: "teams",
  },
};

const tabs = Object.values(tabsMap);

export default function Settings() {
  const { loading, error } = useMe();
  const [q] = useSearchParams();

  if (loading) {
    return (
      <Box
        display="flex"
        flexGrow={1}
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    throw error;
  }

  const value = (q.get("tab") || tabsMap.profile.path) as keyof typeof tabsMap;

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
              key={path}
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
