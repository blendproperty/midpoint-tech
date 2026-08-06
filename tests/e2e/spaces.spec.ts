import { test, expect } from "@playwright/test";

test("spaces can be filtered by type", async ({ page }) => {
  await page.goto("/spaces");
  await page.getByLabel("Space type").selectOption("office-suite");
  await expect(page).toHaveURL(/type=office-suite/);
  await expect(page.getByText(/spaces? found/)).toBeVisible();
});

test("a space detail page opens with a working gallery", async ({ page }) => {
  await page.goto("/spaces");
  await page.getByRole("link", { name: /Suite 201/ }).first().click();
  await expect(page).toHaveURL(/\/spaces\/block-a-suite-201/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Suite 201");
  await page.getByRole("button", { name: "View full screen" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
});
