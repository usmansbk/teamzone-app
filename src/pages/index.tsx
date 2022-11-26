import { LinearProgress } from "@mui/material";
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "src/config/i18n";

function Main() {
  return (
    <Suspense fallback={<LinearProgress />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default Main;
