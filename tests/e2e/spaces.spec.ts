import { test, expect } from "@playwright/test";

test("spaces can be filtered by type", async ({ page }) => {
  await page.goto("/spaces");
  const initialCount = await page.getByRole("article").count();
  expect(initialCount).toBeGreaterThan(0);

  await page.getByRole("button", { name: "Studio", exact: true }).click();
  await expect(page.getByText(/space(s)? found/)).toBeVisible();
});

test("a space detail page opens with gallery controls", async ({ page }) => {
  await page.goto("/spaces");
  await page.getByRole("link", { name: /View suite-201-north-wing|Suite 201, North Wing/i }).first().click();
  await expect(page).toHaveURL(/\/spaces\//);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("button", { name: "Book a tour" })).toBeVisible();
});

test("keyboard navigation reaches the primary CTA", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByText("Skip to main content")).toBeFocused();
});
