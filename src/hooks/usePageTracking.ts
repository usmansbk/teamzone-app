import { useEffect } from "react";
import ReactGA from "react-ga";
import { useLocation } from "react-router-dom";

export default function usePageTracking() {
  const location = useLocation();
  useEffect(() => {
    ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID, {
      debug: true,
    });
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);
}
