import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./views/App";

import "./views/styles/reset.scss";
import "./views/styles/common.scss";
import { ThemeProvider } from "./providers/ThemeProvider";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </ThemeProvider>
);
