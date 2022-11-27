import { LinearProgress, useTheme } from "@mui/material";
import { Suspense, useMemo } from "react";
import { RouterProvider } from "react-router-dom";
import { Toaster, DefaultToastOptions } from "react-hot-toast";
import router from "./router";
import "src/config/i18n";

function Pages() {
  const { palette, typography, shape } = useTheme();
  const toastOptions = useMemo<DefaultToastOptions>(
    () => ({
      success: {
        style: {
          ...typography.body1,
          background: palette.success.main,
          color: palette.success.contrastText,
          fontWeight: 600,
          borderRadius: shape.borderRadius,
        },
      },
      error: {
        style: {
          ...typography.body1,
          background: palette.error.main,
          color: palette.error.contrastText,
          fontWeight: 600,
          borderRadius: shape.borderRadius,
        },
      },
    }),
    [palette, typography, shape]
  );

  return (
    <Suspense fallback={<LinearProgress />}>
      <RouterProvider router={router} />
      <Toaster toastOptions={toastOptions} />
    </Suspense>
  );
}

export default Pages;
