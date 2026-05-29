import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Pagination from "./Pagination";

describe("Pagination", () => {
  it("disables Previous button on page 1", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        pageSize={5}
        onPageChange={vi.fn()}
        onPageSizeChange={vi.fn()}
      />
    );

    expect(
      screen.getByRole("button", { name: /previous/i })
    ).toBeDisabled();
  });

  it("calls onPageChange when Next is clicked", async () => {
    const user = userEvent.setup();
    const mockPageChange = vi.fn();

    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        pageSize={5}
        onPageChange={mockPageChange}
        onPageSizeChange={vi.fn()}
      />
    );

    await user.click(
      screen.getByRole("button", { name: /next/i })
    );

    expect(mockPageChange).toHaveBeenCalledWith(2);
  });

  it("calls onPageSizeChange when page size changes", async () => {
    const user = userEvent.setup();
    const mockPageSizeChange = vi.fn();

    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        pageSize={5}
        onPageChange={vi.fn()}
        onPageSizeChange={mockPageSizeChange}
      />
    );

    await user.selectOptions(screen.getByRole("combobox"), "10");

    expect(mockPageSizeChange).toHaveBeenCalledWith(10);
  });
});