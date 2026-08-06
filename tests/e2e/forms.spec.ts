import { test, expect } from "@playwright/test";

test("tour booking form validates required fields", async ({ page }) => {
  await page.goto("/contact?intent=tour");
  await page.getByRole("button", { name: "Request a tour" }).click();
  await expect(page.getByText("Enter your full name")).toBeVisible();
});

test("tour booking form submits successfully in development", async ({ page }) => {
  await page.goto("/contact?intent=tour");
  await page.getByLabel("Full name").fill("Test Founder");
  await page.getByLabel("Company").fill("Test Co");
  await page.getByLabel("Work email").fill("test@example.com");
  await page.getByLabel("Phone").fill("+27820000000");
  await page.getByLabel("Approximate space required").selectOption("100-300");
  await page.getByLabel("Preferred move-in timing").selectOption("3-months");
  await page.getByLabel("Preferred visit date").fill("2026-09-15");
  await page.getByLabel(/I consent/).check();
  await page.getByRole("button", { name: "Request a tour" }).click();
  await expect(page.getByText(/your tour request has been sent/i)).toBeVisible({ timeout: 10_000 });
});
