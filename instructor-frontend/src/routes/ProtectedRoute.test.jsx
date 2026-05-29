import { afterEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

function renderProtectedRoute({ adminOnly = false } = {}) {
  return render(
    <MemoryRouter initialEntries={["/secret"]}>
      <Routes>
        <Route path="/login" element={<p>Login Page</p>} />
        <Route path="/dashboard" element={<p>Dashboard Page</p>} />

        <Route
          path="/secret"
          element={
            <ProtectedRoute adminOnly={adminOnly}>
              <p>Secret Page</p>
            </ProtectedRoute>
          }
        />
      </Routes>
    </MemoryRouter>
  );
}

describe("ProtectedRoute", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("redirects to login when there is no token", () => {
    renderProtectedRoute();

    expect(screen.getByText(/login page/i)).toBeInTheDocument();
  });

  it("redirects normal user away from admin-only route", () => {
    localStorage.setItem("token", "fake-token");
    localStorage.setItem("role", "USER");

    renderProtectedRoute({ adminOnly: true });

    expect(screen.getByText(/dashboard page/i)).toBeInTheDocument();
  });

  it("allows admin user to access admin-only route", () => {
    localStorage.setItem("token", "fake-token");
    localStorage.setItem("role", "ADMIN");

    renderProtectedRoute({ adminOnly: true });

    expect(screen.getByText(/secret page/i)).toBeInTheDocument();
  });
});