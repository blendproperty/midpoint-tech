import { test, expect } from "@playwright/test";

test("homepage loads with primary content", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Midpoint Tech/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Space for technology businesses");
  await expect(page.getByRole("link", { name: /Explore available spaces/i })).toBeVisible();
});

test("main navigation links work", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Spaces" }).click();
  await expect(page).toHaveURL(/\/spaces$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Find your space");
});

test("mobile navigation opens and closes", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Mobile-only nav test");
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("dialog", { name: "Menu" })).toBeVisible();
  await page.getByRole("link", { name: "Location" }).click();
  await expect(page).toHaveURL(/\/location$/);
});

test("404 page renders for an unknown route", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByText(/couldn.t find that page/i)).toBeVisible();
});
