import { Suspense } from "react";
import Pages from "./pages";
import "./config/i18n";

function App() {
  return (
    <Suspense fallback="Loading">
      <Pages />
    </Suspense>
  );
}

export default App;
