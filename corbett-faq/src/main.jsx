import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app.css";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AdminLayout from "./AdminLayout.jsx";
import AdminFaq from "./AdminFaq.jsx";
import UserFaq from "./UserFaq.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Navigate to="/faq" replace />}
        />

        <Route
          path="/faq"
          element={<UserFaq />}
        />

        <Route path="/admin" element={<AdminLayout />}>
          <Route
            path="faq"
            element={<AdminFaq />}
          />
        </Route>

      </Routes>
    </BrowserRouter>
  </StrictMode>
);