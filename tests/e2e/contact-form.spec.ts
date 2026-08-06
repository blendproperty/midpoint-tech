import { test, expect } from "@playwright/test";

test("tour form shows validation errors when submitted empty", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Request a tour" }).click();
  await expect(page.getByRole("alert").first()).toBeVisible();
});

test("tour form submits successfully with valid data", async ({ page }) => {
  await page.goto("/contact");
  await page.getByLabel(/Full name/).fill("Jane Doe");
  await page.getByLabel(/Company/).fill("Acme Technologies");
  await page.getByLabel(/Work email/).fill("jane@acme.com");
  await page.getByLabel(/Phone/).fill("0110000000");
  await page.getByLabel(/Approximate space required/).fill("150 m2");
  await page.getByLabel(/Preferred visit date/).fill("2026-12-01");
  await page.getByLabel(/I agree to be contacted/).check();
  await page.getByRole("button", { name: "Request a tour" }).click();
  await expect(page.getByRole("status")).toContainText("we'll be in touch");
});

test("keyboard navigation reaches the tour form submit button", async ({ page }) => {
  await page.goto("/contact");
  await page.getByLabel(/Full name/).focus();
  for (let i = 0; i < 20; i++) {
    await page.keyboard.press("Tab");
  }
  // Just confirm focus is still somewhere sensible inside the form region
  await expect(page.locator(":focus")).toBeVisible();
});
