import { beforeEach, describe, test, expect } from "@playwright/test";

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing");
  });

  test("shows login form by default", async ({ page }) => {
    await page.goto("http://localhost:5173");

    await expect(page.getByLabel("username")).toBeVisible();
    await expect(page.getByLabel("password")).toBeVisible();
  });
});
