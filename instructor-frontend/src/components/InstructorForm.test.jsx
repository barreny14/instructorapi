import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import InstructorForm from "./InstructorForm";

function renderInstructorForm(props = {}) {
  const defaultProps = {
    initialData: null,
    onSubmit: vi.fn(),
  };

  return render(
    <MemoryRouter>
      <InstructorForm {...defaultProps} {...props} />
    </MemoryRouter>
  );
}

describe("InstructorForm", () => {
  
  it("shows validation errors when submitting an empty form", async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn();

    renderInstructorForm({ onSubmit: mockSubmit });

    await user.click(
      screen.getByRole("button", { name: /submit/i }) 
    );

    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/specialization is required/i)).toBeInTheDocument();
    expect(screen.getByText(/years experience is required/i)).toBeInTheDocument();

    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it("submits valid instructor data", async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn();

    renderInstructorForm({ onSubmit: mockSubmit });

    await user.type(screen.getByLabelText(/name/i), "Alice Johnson");
    await user.type(screen.getByLabelText(/email/i), "alice@test.com");
    await user.type(screen.getByLabelText(/specialization/i), "Java Spring Boot");
    await user.type(screen.getByLabelText(/years/i), "5");

    await user.click(screen.getByLabelText(/active/i));

    await user.click(
      screen.getByRole("button", { name: /submit/i })
    );

    expect(mockSubmit).toHaveBeenCalledWith({
      name: "Alice Johnson",
      email: "alice@test.com",
      specialization: "Java Spring Boot",
      yearsOfExperience: 5, 
      status: "ACTIVE", 
    });
  });
});