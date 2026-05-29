import { test, expect } from "@playwright/test";

test("admin can login and view instructors page", async ({ page }) => {
  await page.goto("http://localhost:5173/login");

  await page.getByPlaceholder("Enter email").fill("arifin@test.com");
  await page.getByPlaceholder("Enter password").fill("mypassword123");
  await page.getByRole("button", { name: /login/i }).click();

  await expect(page).toHaveURL(/dashboard/);

  await page.goto("http://localhost:5173/instructors");

  await expect(
    page.getByRole("heading", { name: /instructors/i })
  ).toBeVisible();

  await expect(
    page.getByPlaceholder(/search/i)
  ).toBeVisible();
});