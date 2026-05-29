import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SearchBox from "./SearchBox";

describe("SearchBox", () => {
  it("calls onSearchChange when user types item", async () => {
    const user = userEvent.setup();
    const mockSearchChange = vi.fn();

    render(
      <SearchBox
        searchTerm=""
        onSearchChange={mockSearchChange}
        resultCount={0}
        totalCount={5}
      />        
    );

    await user.type(screen.getByRole("textbox"), "j");
    expect(mockSearchChange).toHaveBeenCalledWith("j");
  });

  it("clears the search term when Clear is clicked", async () => {
    const user = userEvent.setup();
    const mockSearchChange = vi.fn();

    render(
      <SearchBox
        searchTerm="java"
        onSearchChange={mockSearchChange}
        resultCount={2}
        totalCount={5}
      />        
    );

    await user.click(screen.getByRole("button", { name: /clear/i }));
    expect(mockSearchChange).toHaveBeenCalledWith("");
  });

  it("renders with empty search input", async () => {
    render(<SearchBox searchTerm="" onSearchChange={vi.fn()} resultCount={0} totalCount={0} />);

    expect(screen.getByRole("textbox")).toHaveValue("");
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("renders with result count when both resultCount and totalCount are provided", async () => {
    render(
      <SearchBox searchTerm="" onSearchChange={vi.fn()} resultCount={10} totalCount={20} />
    );

    expect(screen.getByText(/Showing 10 of 20/i)).toBeInTheDocument();
  });
});