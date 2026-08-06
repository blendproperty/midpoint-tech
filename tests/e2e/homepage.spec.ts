import { test, expect } from "@playwright/test";

test("homepage loads and shows the hero headline", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Space for technology businesses");
});

test("main navigation links to key pages", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Spaces", exact: true }).first().click();
  await expect(page).toHaveURL(/\/spaces$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Spaces to lease");
});

test("mobile navigation opens and closes", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile-only test");
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("link", { name: "Experience" })).toBeVisible();
  await page.getByRole("button", { name: "Close menu" }).click();
});

test("404 page renders for an unknown route", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByText("This page has moved or doesn't exist.")).toBeVisible();
});
